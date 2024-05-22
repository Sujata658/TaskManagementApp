import mongoose, { Document, Types } from 'mongoose';

export interface Task {
  title: string;
  description: string;
  duedate: Date;
  priority: string;
  // author: Types.ObjectId;
  // activities: [];
  // stage: Types.ObjectId;
}

export interface TaskDocument extends Document, Task {
  // tags?: [];
  // comments?: [];
  // assignees?: [];
}

const TaskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is Required'],
      unique: false,
    },
    description: {
      type: String,
      required: [true, 'Description is Required'],
      unique: false,
    },
    duedate: {
      type: Date,
      required: [true, 'Due date is required'],
      unique: false,
    },
    priority: {
      type: String,
      required: false,
      default: 'normal'
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'user',
    //   required: [true, 'Author is Required'],
    //   unique: false,
    // },
    // stage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'stage',
    //   required: [true, 'Stage is Required'],
    //   unique: false,
    // },
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'comment',
    //     required: false,
    //   },
    // ],
    // tags: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'tag',
    //     required: false,
    //   },
    // ],
    // activities: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'activity',
    //     required: true
    //   },
    // ],
    // assignees: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: false,
    //   },
    // ],
  },
  {
    timestamps: true,
  },
);



export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);