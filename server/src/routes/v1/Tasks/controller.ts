import { Request, Response } from "express";
import { Task } from "./model";
import { errorHandler } from "utils/Error";
import InputValidation from "utils/InputValidation";
import TaskService from "./service";
import { successResponse } from "utils/HttpResponse";
import { messages } from "utils/Messages";

const TasksController = {
    async createTask(req: Request<unknown, unknown, Task>, res: Response) {
        try {
            const task = req.body
            InputValidation.validateTask(task)

            const result = await TaskService.createTask(task)

            return successResponse({
                response: res,
                message: messages.task.creation_success,
                data: result,
                status: 20
            })


        } catch (error) {
            errorHandler(res, error)
        }
    },
    async getTask(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params
            InputValidation.validateid(id)
            const result = await TaskService.getTask(id)

            return successResponse({
                response: res,
                message: messages.task.one_get_success,
                status: 200,
                data: result
            })
        } catch (error) {
            errorHandler(res, error)
        }
    },
    async getTasks(req: Request, res: Response) {
        try {
            const result = await TaskService.getTasks()
            return successResponse({
                response: res,
                message: messages.task.all_get_success,
                data: result
            })
        } catch (error) {
            errorHandler(res, error)
        }

    },
    async updateTask(req: Request<{ id: string }, unknown, Partial<Task>>, res: Response) {
        try {
            const { id } = req.params

            const data = req.body
            InputValidation.validateid(id)

            const result = await TaskService.updateTask(id, data)

            return successResponse({
                response: res,
                message: messages.task.edit_success,
                data: result,
                status: 200,
            });

        } catch (error) {
            errorHandler(res, error)
        }
    },
    async deleteTask(req: Request<{ id: string }>, res: Response) {
        try {
            const {id } = req.params
            InputValidation.validateid(id);

            await TaskService.deleteTask(id)

            return successResponse({
                response: res,
                message: messages.task.delete_success,
                status: 200,
              });
        } catch (error) {

        }




    }

}
export default TasksController;