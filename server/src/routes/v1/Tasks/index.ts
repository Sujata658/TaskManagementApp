import { Router } from 'express';
import TasksController from './controller';
import { requireUser } from '../../../middleware/requireUser';

 

const TaskRouter = Router();


// Get All the tasks
TaskRouter.route('/').get(requireUser, TasksController.getTasks);

//Get todo tasks
TaskRouter.route('/:status').get(requireUser, TasksController.getToDoTasks);

// Get one task
TaskRouter.route('/:id').get(requireUser, TasksController.getTask);

// Create new task
TaskRouter.route('/').post( requireUser,TasksController.createTask);

// Update a task
TaskRouter.route('/:id').patch(requireUser, TasksController.updateTask);

// Delete a task
TaskRouter.route('/:id').delete(requireUser, TasksController.deleteTask);


export default TaskRouter;