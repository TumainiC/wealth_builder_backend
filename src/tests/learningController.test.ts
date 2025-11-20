import request from 'supertest';
import express from 'express';
import learningRoutes from '../routes/learningRoutes';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use('/api/learning', learningRoutes);

const prisma = new PrismaClient();

describe('Learning Controller', () => {
    let authToken: string;
    let userId: string;
    let moduleId: string;

    beforeAll(async () => {
        // Create test user
        const user = await prisma.user.create({
            data: {
                email: 'learningtest@example.com',
                passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
                literacyLevel: 'BEGINNER',
                primaryGoal: 'START_BUSINESS'
            }
        });
        userId = user.id;
        authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'test-secret');

        // Get a module ID from the database
        const module = await prisma.module.findFirst();
        if (module) {
            moduleId = module.id;
        }
    });

    afterAll(async () => {
        await prisma.quizResponse.deleteMany({ where: { userId } });
        await prisma.userProgress.deleteMany({ where: { userId } });
        await prisma.user.delete({ where: { id: userId } });
        await prisma.$disconnect();
    });

    describe('GET /api/learning/paths', () => {
        it('should get all learning paths successfully', async () => {
            const response = await request(app)
                .get('/api/learning/paths');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toHaveProperty('title');
            expect(response.body[0]).toHaveProperty('modules');
        });
    });

    describe('GET /api/learning/modules/:id', () => {
        it('should get module by ID successfully', async () => {
            if (!moduleId) {
                console.log('Skipping test - no modules in database');
                return;
            }

            const response = await request(app)
                .get(`/api/learning/modules/${moduleId}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', moduleId);
            expect(response.body).toHaveProperty('title');
            expect(response.body).toHaveProperty('content');
            expect(response.body).toHaveProperty('quizQuestions');
        });

        it('should return 404 for non-existent module', async () => {
            const response = await request(app)
                .get('/api/learning/modules/non-existent-id');

            expect(response.status).toBe(404);
        });
    });

    describe('POST /api/learning/quiz', () => {
        it('should submit quiz successfully', async () => {
            if (!moduleId) {
                console.log('Skipping test - no modules in database');
                return;
            }

            const module = await prisma.module.findUnique({ where: { id: moduleId } });
            const quizQuestions = module?.quizQuestions as any[];
            const answers = quizQuestions?.map(q => q.correctAnswer) || [];

            const response = await request(app)
                .post('/api/learning/quiz')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    moduleId,
                    answers
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('score');
            expect(response.body).toHaveProperty('correctAnswers');
            expect(response.body).toHaveProperty('totalQuestions');
            expect(response.body).toHaveProperty('passed');
        });

        it('should return 401 without auth token', async () => {
            const response = await request(app)
                .post('/api/learning/quiz')
                .send({
                    moduleId: 'some-id',
                    answers: ['answer1', 'answer2']
                });

            expect(response.status).toBe(401);
        });

        it('should return 400 for missing fields', async () => {
            const response = await request(app)
                .post('/api/learning/quiz')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    moduleId: 'some-id'
                    // Missing answers
                });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/learning/progress', () => {
        it('should update progress successfully', async () => {
            if (!moduleId) {
                console.log('Skipping test - no modules in database');
                return;
            }

            const response = await request(app)
                .post('/api/learning/progress')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    moduleId,
                    completed: true
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

        it('should return 401 without auth token', async () => {
            const response = await request(app)
                .post('/api/learning/progress')
                .send({
                    moduleId: 'some-id',
                    completed: true
                });

            expect(response.status).toBe(401);
        });
    });
});
