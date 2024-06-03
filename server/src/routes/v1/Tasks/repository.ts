import mongoose from "mongoose";
import { Task, TaskModel } from "./model";
import TagsServices from "../Tags/service";

export const createTask = async (task: Task, authorId: string, tags: string[]): Promise<Task> => {
  const newTask = new TaskModel({ ...task, author: authorId })
  const createdTask = await newTask.save()
  await TagsServices.updateNewTags(tags, createdTask._id.toString())
  return createdTask
}


export const getTask = (id: string, authorId: string): Promise<Task | null> => {
  return TaskModel.findOne({
    _id: id,
    $or: [{ author: authorId }, { assignees: authorId }],
  })
    .populate({ path: 'assignees', select: 'name email' })

    .populate({ path: 'comments', select: 'content author createdAt' })
    .lean()
    .exec()
    .then((task: Task | null) => {
      if (task) {

      }
      return task;
    });
}



export const getTaskById = (id: string) => {
  return TaskModel.findById(id)
}


export const getTasks = (authorId: string) => {
  return TaskModel.find({
    $or: [{ author: authorId }, { assignees: authorId }],
  })
    .sort({
      dueDate: 1,
      createdAt: 1
    }).populate({
      path: 'author',
      select: 'name -_id',
      options: { lean: true }
    }).populate({ path: 'tags', select: 'name' })
    .populate({ path: 'assignees', select: 'name email' })
    .populate({ path: 'comments', select: 'content author createdAt' })
    
    ;
}


export const updateTask = (id: string, userId: string, data: Partial<Task>): Promise<Task | null> => {
  return TaskModel.findOneAndUpdate({ _id: id, author: userId }, data, { new: true }
  )
}


export const deleteTask = (id: string, authorId: string) => {
  return TaskModel.deleteOne({ _id: id, author: authorId });
}

export const addCommentToTask = (taskId: string, commentId: string) => {
  return TaskModel.findOneAndUpdate(
    { _id: taskId },
    {
      $push: {
        comments: new mongoose.Types.ObjectId(commentId),
      },
    },
  );
};

export const deleteTaskComment = (id: string, taskId: string, commentAuthor: string): Promise<Task | null> => {
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

export const getToDoTasks = (authorId: string, status: string) => {
  return TaskModel.find({
    $or: [{ author: authorId }, { assignees: authorId }],
    status: status
  })
    .sort({
      priority: -1,
      duedate: -1,
      createdAt: 1
    }).populate({
      path: 'author',
      select: 'name -_id',
      options: { lean: true }
    }).populate({ path: 'tags', select: 'name' })
    .populate({ path: 'assignees', select: 'name email' })
    .populate({ path: 'comments', select: 'content author createdAt' })
    ;
}

export const updateTaskStatus = (id: string, userId: string,to : string): Promise<Task | null> => {
  return TaskModel.findOneAndUpdate({ _id: id, $or: [{ author: userId }, { assignees: userId }],
  }, {status: to}, { new: true }
  )
}
