import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use('/api/user', userRoutes);

const prisma = new PrismaClient();

describe('User Controller', () => {
    let authToken: string;
    let userId: string;

    beforeAll(async () => {
        // Create a test user
        const user = await prisma.user.create({
            data: {
                email: 'usertest@example.com',
                passwordHash: '$2a$10$abcdefghijklmnopqrstuv', // Dummy hash
                literacyLevel: 'BEGINNER',
                primaryGoal: 'START_BUSINESS'
            }
        });
        userId = user.id;

        // Generate auth token
        authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'test-secret');
    });

    afterAll(async () => {
        await prisma.quizResponse.deleteMany({ where: { userId } });
        await prisma.userProgress.deleteMany({ where: { userId } });
        await prisma.user.delete({ where: { id: userId } });
        await prisma.$disconnect();
    });

    describe('GET /api/user/profile', () => {
        it('should get user profile successfully', async () => {
            const response = await request(app)
                .get('/api/user/profile')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email', 'usertest@example.com');
            expect(response.body).toHaveProperty('literacyLevel', 'BEGINNER');
            expect(response.body).not.toHaveProperty('passwordHash');
        });

        it('should return 401 without auth token', async () => {
            const response = await request(app)
                .get('/api/user/profile');

            expect(response.status).toBe(401);
        });

        it('should return 401 with invalid token', async () => {
            const response = await request(app)
                .get('/api/user/profile')
                .set('Authorization', 'Bearer invalid-token');

            expect(response.status).toBe(401);
        });
    });

    describe('PUT /api/user/profile', () => {
        it('should update literacy level successfully', async () => {
            const response = await request(app)
                .put('/api/user/profile')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    literacyLevel: 'INTERMEDIATE'
                });

            expect(response.status).toBe(200);
            expect(response.body.user).toHaveProperty('literacyLevel', 'INTERMEDIATE');
        });

        it('should update primary goal successfully', async () => {
            const response = await request(app)
                .put('/api/user/profile')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    primaryGoal: 'INVEST_STOCKS'
                });

            expect(response.status).toBe(200);
            expect(response.body.user).toHaveProperty('primaryGoal', 'INVEST_STOCKS');
        });

        it('should return 401 without auth token', async () => {
            const response = await request(app)
                .put('/api/user/profile')
                .send({
                    literacyLevel: 'ADVANCED'
                });

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/user/progress', () => {
        it('should get user progress successfully', async () => {
            const response = await request(app)
                .get('/api/user/progress')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('totalModules');
            expect(response.body).toHaveProperty('completedModules');
            expect(response.body).toHaveProperty('completionPercentage');
            expect(response.body).toHaveProperty('progress');
            expect(Array.isArray(response.body.progress)).toBe(true);
        });

        it('should return 401 without auth token', async () => {
            const response = await request(app)
                .get('/api/user/progress');

            expect(response.status).toBe(401);
        });
    });
});
