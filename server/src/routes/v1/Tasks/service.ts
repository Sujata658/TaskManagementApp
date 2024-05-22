import CustomError from "utils/Error";
import { Task } from "./model";
import { createTask, getTask, getTasks, updateTask, deleteTask } from "./repository";
import { messages } from "utils/Messages";

const TaskService = {
    createTask(task: Task) {
        return createTask(task)
    },
    async getTask(id: string) {
        const task = await getTask(id)
        if (!task) throw new CustomError(messages.task.not_found, 404)
        return task
    },
    async getTasks() {
        const tasks = await getTasks()
        if (!tasks) throw new CustomError(messages.task.not_found, 404)
        return tasks
    },
    async updateTask(id: string, data: Partial<Task>) {


        const task = await getTask(id)

        if (!task) throw new CustomError(messages.task.not_found, 404)

        const res = await updateTask(id, data);
        if (!res) throw new CustomError(messages.task.edit_forbidden, 403);

        return res

    },
    async deleteTask(id: string) {
        const task = await getTask(id);
        if (!task) throw new CustomError(messages.task.not_found, 404);

        const result = await deleteTask(id);

        if (result.deletedCount === 0) {
            throw new CustomError(messages.task.delete_forbidden, 403);
        }

        return result;
    }
}
export default TaskService;