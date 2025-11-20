import { Router } from 'express';
import { getProfile, updateProfile, getUserProgress } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// All user routes require authentication
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/progress', authenticate, getUserProgress);

export default router;
