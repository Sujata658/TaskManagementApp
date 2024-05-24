import { Router } from 'express';
import { requireUser } from '../../../middleware/requireUser';
import CommentsController from './controller';

const CommentsRouter = Router({mergeParams: true});


// Create a Comment
CommentsRouter.route('/').post(requireUser, CommentsController.createComment);

// Edit a Comment
CommentsRouter.route('/:id').patch(requireUser,CommentsController.updateComment);

// Delete a Comment
CommentsRouter.route('/:id').delete(requireUser, CommentsController.deleteComment);

export default CommentsRouter;