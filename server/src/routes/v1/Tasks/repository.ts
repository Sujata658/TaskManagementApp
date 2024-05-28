import mongoose from "mongoose";
import { Task, TaskDocument, TaskModel } from "./model";

export const createTask = (task: Task, authorId: string): Promise<TaskDocument> => {
    const newTask = new TaskModel({ ...task, author: authorId })
    return newTask.save()
}


export const getTask = (id: string, authorId: string): Promise<TaskDocument | null> => {
  return TaskModel.findOne({
    _id: id,
    $or: [{ author: authorId }, { assignees: authorId }],
  })
  .populate({ path: 'assignees', select: 'name email' })
  .populate({ path: 'comments', select: 'content author createdAt' })
  .lean()
  .exec()
  .then((task: TaskDocument | null) => {
    if (task) {
      
    }
    return task;
  });
}



export const getTaskById = (id: string)=> {
    return TaskModel.findById(id)
}


export const getTasks = (authorId: string) => {
  return TaskModel.find({
    $or: [{ author: authorId }, { assignees: authorId }],
})
.sort({
  priority: -1,
  duedate: -1, 
  createdAt: 1 
}).populate({
  path: 'author',
  select: 'name -_id',
  options: { lean: true } 
})
.populate({ path: 'assignees', select: 'name email' })
.populate({ path: 'comments', select: 'content author createdAt' })
;
}


export const updateTask = (id: string, userId: string, data: Partial<Task>): Promise<TaskDocument | null> => {
    return TaskModel.findOneAndUpdate({ _id: id, author: userId }, data, { new: true }
    )
}


export const deleteTask = (id: string, authorId: string) => {
    return TaskModel.deleteOne({ _id: id, author: authorId });
}

export const addCommentToTask=(taskId: string, commentId: string) => {
    return TaskModel.findOneAndUpdate(
      { _id: taskId },
      {
        $push: {
          comments: new mongoose.Types.ObjectId(commentId),
        },
      },
    );
  };

  export const  deleteTaskComment=(id:string, taskId: string, commentAuthor: string): Promise<TaskDocument | null> =>{
    return TaskModel.findOneAndUpdate(
      { 
        _id: taskId,
        "comments._id": new mongoose.Types.ObjectId(id)
      },
      {
        $pull: {
          comments: { _id: new mongoose.Types.ObjectId(id) }
        },
      },
      { new: true } 
    ).exec();
  }