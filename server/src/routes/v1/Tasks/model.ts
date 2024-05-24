import { priority } from '../../../enums/priority';
import mongoose, { Types } from 'mongoose';

export interface Task {
  title: string;
  description: string;
  duedate: Date;
  priority: priority;
  author: Types.ObjectId;
  // activities: [];
  // stage: Types.ObjectId;
}

export interface TaskDocument extends Task {
  // tags?: [];
  comments?: [];
  assignees?: [];
}

const TaskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is Required'],
      unique: false,
      trim: true
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
      default: Date.now() + 24 * 60 * 60 * 1000
    },
    priority: {
      type: Number,
      required: [true, 'Priority for task is Required'],
      default: priority.normal
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Author is Required'],
      unique: false,
    },
    // tags: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'tag',
    //     required: false,
    //   },
    // ],
    assignees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        required: false,
      },
    ],
    // stage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'stage',
    //   required: [true, 'Stage is Required'],
    //   unique: false,
    // },
    // activities: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'activity',
    //     required: true
    //   },
    // ],
  },
  {
    timestamps: true,
  },
);



export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);