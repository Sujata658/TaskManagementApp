import { Task, TaskDocument, TaskModel } from "./model";

export const createTask = (task: Task):Promise<TaskDocument>=>{
    const newTask = new TaskModel(task)
    return newTask.save()
}
export const getTask = (id: string):Promise<TaskDocument | null>=>{
    return TaskModel.findById(id)
}
export const getTasks = ():Promise<TaskDocument[]>=>{
    return TaskModel.find()
}

export const updateTask = (id:string, data: Partial<Task>): Promise<TaskDocument | null>=>{
    return TaskModel.findOneAndUpdate({_id: id}, data,{new: true}
    )
}
export const deleteTask = (id:string)=>{
    return TaskModel.deleteOne({ _id: id });
}