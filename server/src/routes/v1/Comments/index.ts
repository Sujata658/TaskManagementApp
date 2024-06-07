import { Router } from 'express';
import { requireUser } from '../../../middleware/requireUser';
import CommentsController from './controller';
import { logActivity } from '../../../middleware/activityLogs';

const CommentsRouter = Router({mergeParams: true});


// Create a Comment
CommentsRouter.route('/').post(requireUser, CommentsController.createComment, logActivity('create', 'comment'));

// Edit a Comment
CommentsRouter.route('/:id').patch(requireUser,CommentsController.updateComment, logActivity('update', 'comment'));

// Delete a Comment
CommentsRouter.route('/:id').delete(requireUser, CommentsController.deleteComment, logActivity('delete', 'comment'));

export default CommentsRouter;