import request from 'supertest';
import app from '../app';
import prisma from '../utils/prisma';

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany();
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            email: 'test@example.com',
            password: 'password123',
            literacyLevel: 'BEGINNER',
            primaryGoal: 'LEARNING',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('id');
        expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should login an existing user', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user.email).toEqual('test@example.com');
    });

    it('should not login with incorrect password', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'wrongpassword',
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid credentials');
    });
});
