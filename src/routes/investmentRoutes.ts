import { Router } from 'express';
import { getInvestments, getInvestment } from '../controllers/investmentController';

const router = Router();

router.get('/', getInvestments);
router.get('/:id', getInvestment);

export default router;
