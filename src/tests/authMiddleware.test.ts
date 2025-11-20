import { authenticate } from '../middleware/authMiddleware';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

describe('Auth Middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction;

    beforeEach(() => {
        mockRequest = {
            headers: {}
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        nextFunction = jest.fn();
    });

    it('should call next() with valid token', () => {
        const token = jwt.sign({ userId: 'test-user-id' }, process.env.JWT_SECRET || 'test-secret');
        mockRequest.headers = {
            authorization: `Bearer ${token}`
        };

        authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should return 401 when no token is provided', () => {
        mockRequest.headers = {};

        authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No token provided' });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 with invalid token', () => {
        mockRequest.headers = {
            authorization: 'Bearer invalid-token'
        };

        authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired token' });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should return 401 with malformed authorization header', () => {
        mockRequest.headers = {
            authorization: 'InvalidFormat'
        };

        authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No token provided' });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should extract userId from token and attach to request', () => {
        const userId = 'test-user-123';
        const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'test-secret');
        mockRequest.headers = {
            authorization: `Bearer ${token}`
        };

        authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

        expect((mockRequest as any).userId).toBe(userId);
        expect(nextFunction).toHaveBeenCalled();
    });
});
