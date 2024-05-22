import { Router } from 'express';
import TasksController from './controller';
import { requireUser } from '../../../middleware/requireUser';

 

const TaskRouter = Router();


// Get All the posts
TaskRouter.route('/').get(requireUser, TasksController.getTasks);

// Get one post
TaskRouter.route('/:id').get(requireUser, TasksController.getTask);

// Create new post
TaskRouter.route('/').post( requireUser,TasksController.createTask);

// Update a post
TaskRouter.route('/:id').patch(requireUser, TasksController.updateTask);

// Delete a post
TaskRouter.route('/:id').delete(requireUser, TasksController.deleteTask);


export default TaskRouter;