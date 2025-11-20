import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes';
import learningRoutes from './routes/learningRoutes';
import investmentRoutes from './routes/investmentRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Wealth Builder Kenya API' });
});

export default app;
