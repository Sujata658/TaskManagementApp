import { NextFunction, Request, Response } from "express";
import { Task } from "./model";
import { errorHandler } from "../../../utils/Error";
import InputValidation from "../../../utils/InputValidation";
import TaskService from "./service";
import { successResponse } from "../../../utils/HttpResponse";
import { messages } from "../../../utils/Messages";

const TasksController = {
    async createTask(req: Request<unknown, unknown, any>, res: Response, next: NextFunction) {
        try {
            const { tags, ...taskFields } = req.body;
            
            const task: Task = {
                title: taskFields.title,
                description: taskFields.description,
                priority: taskFields.priority,
                assignees: taskFields.assignees
            };
            
            const author = res.locals.user as { _id: string };
    
            InputValidation.validateid(author._id);
            InputValidation.validateTask(task);

            await TaskService.createTask(task, author._id, tags);
            return successResponse({
                response: res,
                message: messages.task.creation_success,
                status: 200
            });
        } catch (error) {
            next(errorHandler(res, error));
        }
    },
    
    async getTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const authorId = res.locals.user as { _id: string }
            InputValidation.validateid(id)
            InputValidation.validateid(authorId._id)

            const result = await TaskService.getTask(id, authorId._id)

            return successResponse({
                response: res,
                message: messages.task.one_get_success,
                status: 200,
                data: result
            })
        } catch (error) {
            next(errorHandler(res, error))
        }
    },
    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = res.locals.user as { _id: string }
            const result = await TaskService.getTasks(authorId._id)
            return successResponse({
                response: res,
                message: messages.task.all_get_success,
                data: result
            })
        } catch (error) {
            next(errorHandler(res, error))
        }

    },
    async updateTask(req: Request<{ id: string }, unknown, Partial<Task>>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const author = res.locals.user as { _id: string }

            const data = req.body
            InputValidation.validateid(id)

            const result = await TaskService.updateTask(id, author._id, data)

            return successResponse({
                response: res,
                message: messages.task.edit_success,
                data: result,
                status: 200,
            });

        } catch (error) {
            next(errorHandler(res, error))
        }
    },
    async deleteTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            InputValidation.validateid(id);

            const author = res.locals.user as { _id: string }

            await TaskService.deleteTask(id, author._id)

            return successResponse({
                response: res,
                message: messages.task.delete_success,
                status: 200,
            });
        } catch (error) {
            next(errorHandler(res, error))
        }




    },


    async getToDoTasks(req: Request<{status: string}>, res: Response, next: NextFunction) {
        try {
            const authorId = res.locals.user as { _id: string }
            const {status} = req.params
            const result = await TaskService.getToDoTasks(authorId._id, status)
            return successResponse({
                response: res,
                message: messages.task.all_get_success,
                data: result
            })
        } catch (error) {
            next(errorHandler(res, error))
        }

    }
}
export default TasksController;