import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

const prisma = new PrismaClient();

describe('Auth Controller', () => {
    beforeAll(async () => {
        // Clean up test data
        await prisma.quizResponse.deleteMany();
        await prisma.userProgress.deleteMany();
        await prisma.user.deleteMany({ where: { email: { contains: 'test' } } });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123',
                    literacyLevel: 'beginner',
                    primaryGoal: 'start_business'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
            expect(response.body.user).toHaveProperty('email', 'test@example.com');
            expect(response.body.user).toHaveProperty('literacyLevel', 'beginner');
        });

        it('should return 400 for missing fields', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test2@example.com',
                    password: 'password123'
                    // Missing literacyLevel and primaryGoal
                });

            expect(response.status).toBe(400);
        });

        it('should return 400 for duplicate email', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'test@example.com', // Already registered
                    password: 'password123',
                    literacyLevel: 'beginner',
                    primaryGoal: 'start_business'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toContain('already exists');
        });

        it('should return 400 for invalid email format', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    email: 'invalid-email',
                    password: 'password123',
                    literacyLevel: 'beginner',
                    primaryGoal: 'start_business'
                });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.user).toHaveProperty('email', 'test@example.com');
        });

        it('should return 401 for incorrect password', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toContain('Invalid credentials');
        });

        it('should return 401 for non-existent user', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(401);
        });

        it('should return 400 for missing fields', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com'
                    // Missing password
                });

            expect(response.status).toBe(400);
        });
    });
});
