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

        // Calculate streak days (consecutive days with activity)
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { createdAt: true }
        });

        let streakDays = 0;
        if (progress.length > 0 || quizResponses.length > 0) {
            // Get all activity dates (progress and quiz responses)
            const activityDates = [
                ...progress.map(p => p.completedAt),
                ...quizResponses.map(q => q.submittedAt)
            ].sort((a, b) => b.getTime() - a.getTime()); // Sort descending

            if (activityDates.length > 0) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const mostRecentActivity = new Date(activityDates[0]);
                mostRecentActivity.setHours(0, 0, 0, 0);

                // Check if user was active today or yesterday
                const daysDiff = Math.floor((today.getTime() - mostRecentActivity.getTime()) / (1000 * 60 * 60 * 24));

                if (daysDiff <= 1) {
                    // Count consecutive days with activity
                    streakDays = 1;
                    let currentDate = new Date(mostRecentActivity);

                    for (let i = 1; i < activityDates.length; i++) {
                        const activityDate = new Date(activityDates[i]);
                        activityDate.setHours(0, 0, 0, 0);

                        const expectedPrevDay = new Date(currentDate);
                        expectedPrevDay.setDate(expectedPrevDay.getDate() - 1);

                        if (activityDate.getTime() === expectedPrevDay.getTime()) {
                            streakDays++;
                            currentDate = activityDate;
                        } else if (activityDate.getTime() < expectedPrevDay.getTime()) {
                            // Gap found, stop counting
                            break;
                        }
                    }
                }
            }
        }

        res.json({
            progress,
            quizResponses,
            completedModules,
            totalQuizzesTaken: quizResponses.length,
            averageScore: averageQuizScore,
            streakDays,
            overallProgress: completionPercentage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
