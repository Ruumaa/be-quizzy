import { Router } from 'express';
import { getHealth } from '../controller/health.controller';
import { AuthRouter } from '../auth/auth';
import { authorization } from '../middleware/authentication';
import {
  addQuizSession,
  getQuizSession,
  getQuizSessionById,
  updateSession,
} from '../controller/quiz_session.controller';

const router = Router();

router.use('/api/user', AuthRouter);

router.use(authorization);
router.get('/api/health', getHealth);
router.get('/api/quiz-session', getQuizSession);
router.get('/api/quiz-session/:id', getQuizSessionById);
router.post('/api/quiz-session', addQuizSession);
router.patch('/api/quiz-session/:id', updateSession);

export { router };
