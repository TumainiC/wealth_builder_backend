import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware to check validation results
export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Registration validation rules
export const registerValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('literacyLevel').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid literacy level'),
    body('primaryGoal').isIn(['start_business', 'invest_stocks', 'p2p_lending', 'general_literacy']).withMessage('Invalid primary goal'),
];

// Login validation rules
export const loginValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Profile update validation rules
export const profileUpdateValidation = [
    body('literacyLevel').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid literacy level'),
    body('primaryGoal').optional().isIn(['start_business', 'invest_stocks', 'p2p_lending', 'general_literacy']).withMessage('Invalid primary goal'),
    body('currentPassword').optional().isString(),
    body('newPassword').optional().isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
];

// Quiz submission validation rules
export const quizSubmissionValidation = [
    body('moduleId').isString().notEmpty().withMessage('Module ID is required'),
    body('answers').isArray({ min: 1 }).withMessage('Answers must be a non-empty array'),
];

// Progress update validation rules
export const progressUpdateValidation = [
    body('moduleId').isString().notEmpty().withMessage('Module ID is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
];
