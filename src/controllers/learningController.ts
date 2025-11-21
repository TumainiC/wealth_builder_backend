import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/authMiddleware';

export const getLearningPaths = async (req: Request, res: Response) => {
    try {
        const paths = await prisma.learningPath.findMany({
            include: {
                modules: {
                    select: { id: true, title: true, order: true },
                    orderBy: { order: 'asc' },
                },
            },
        });
        res.json(paths);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getModule = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const module = await prisma.module.findUnique({
            where: { id },
            include: {
                path: true,
            },
        });

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        res.json(module);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { moduleId, answers } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!moduleId || !answers) {
            return res.status(400).json({ message: 'Module ID and answers are required' });
        }

        // Get module with quiz questions
        const module = await prisma.module.findUnique({
            where: { id: moduleId },
        });

        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        // Calculate score
        const quizQuestions = module.quizQuestions as any[];
        let correctAnswers = 0;

        quizQuestions.forEach((question: any, index: number) => {
            if (answers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });

        const score = Math.round((correctAnswers / quizQuestions.length) * 100);
        const passed = score >= 80; // 80% pass mark

        // Save quiz response
        const quizResponse = await prisma.quizResponse.create({
            data: {
                userId,
                moduleId,
                answers,
                score,
            },
        });

        // Update or create user progress - only mark as completed if passed
        await prisma.userProgress.upsert({
            where: {
                userId_moduleId: {
                    userId,
                    moduleId,
                },
            },
            update: {
                completed: passed,
                quizScore: score,
                completedAt: passed ? new Date() : undefined,
            },
            create: {
                userId,
                moduleId,
                completed: passed,
                quizScore: score,
            },
        });

        res.json({
            score,
            correctAnswers,
            totalQuestions: quizQuestions.length,
            passed,
            quizResponseId: quizResponse.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const submitProgress = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { moduleId, completed } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!moduleId) {
            return res.status(400).json({ message: 'Module ID is required' });
        }

        // Update or create user progress
        const progress = await prisma.userProgress.upsert({
            where: {
                userId_moduleId: {
                    userId,
                    moduleId,
                },
            },
            update: {
                completed: completed ?? false,
                completedAt: new Date(),
            },
            create: {
                userId,
                moduleId,
                completed: completed ?? false,
            },
        });

        res.json(progress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
