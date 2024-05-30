import { Router } from 'express';

import Health from './Health';
import auth from './Auth';
import TaskRouter from './Tasks';
import UserRouter from './Users';
import CommentsRouter from './Comments';
import TagsRouter from './Tags';

const router = Router();
router.use('/health', Health);

router.use('/auth', auth)
router.use('/users', UserRouter);
router.use('/tasks/:taskId/comments', CommentsRouter)
router.use('/tasks/:taskId/tags', TagsRouter)
router.use('/tasks', TaskRouter)

export default router;
