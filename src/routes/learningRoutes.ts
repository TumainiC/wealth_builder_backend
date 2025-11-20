import { Router } from 'express';
import { getLearningPaths, getModule, submitQuiz, submitProgress } from '../controllers/learningController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/paths', getLearningPaths);
router.get('/modules/:id', getModule);
router.post('/quiz', authenticate, submitQuiz);
router.post('/progress', authenticate, submitProgress);

export default router;
