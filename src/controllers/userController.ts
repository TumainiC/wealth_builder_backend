import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../utils/prisma';
import bcrypt from 'bcryptjs';

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                literacyLevel: true,
                primaryGoal: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { literacyLevel, primaryGoal, currentPassword, newPassword } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // If password change is requested, verify current password
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ message: 'Current password is required to change password' });
            }

            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(newPassword, salt);

            await prisma.user.update({
                where: { id: userId },
                data: { passwordHash },
            });
        }

        // Update other profile fields
        const updateData: any = {};
        if (literacyLevel) updateData.literacyLevel = literacyLevel;
        if (primaryGoal) updateData.primaryGoal = primaryGoal;

        if (Object.keys(updateData).length > 0) {
            await prisma.user.update({
                where: { id: userId },
                data: updateData,
            });
        }

        const updatedUser = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                literacyLevel: true,
                primaryGoal: true,
                createdAt: true,
            },
        });

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserProgress = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Get all user progress
        const progress = await prisma.userProgress.findMany({
            where: { userId },
            include: {
                module: {
                    select: {
                        id: true,
                        title: true,
                        pathId: true,
                        order: true,
                    },
                },
            },
            orderBy: { completedAt: 'desc' },
        });

        // Get quiz responses
        const quizResponses = await prisma.quizResponse.findMany({
            where: { userId },
            orderBy: { submittedAt: 'desc' },
        });

        // Calculate statistics
        const totalModules = await prisma.module.count();
        const completedModules = progress.filter(p => p.completed).length;
        const completionPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

        const averageQuizScore = quizResponses.length > 0
            ? Math.round(quizResponses.reduce((sum, q) => sum + q.score, 0) / quizResponses.length)
            : 0;

        res.json({
            progress,
            quizResponses,
            statistics: {
                totalModules,
                completedModules,
                completionPercentage,
                averageQuizScore,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
