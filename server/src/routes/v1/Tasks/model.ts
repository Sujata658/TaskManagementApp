import { priority } from '../../../enums/priority';
import { status } from '../../../enums/status';
import mongoose, { Types } from 'mongoose';

export interface Task {
  title: string;
  description: string;
  duedate: Date;
  priority: priority;
  author: Types.ObjectId;
  color: string;
  status: status;
}



export interface TaskDocument extends Task {
  tags?: [];
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
      type: String,
      enum: priority,
      required: [true, 'Priority for task is Required'],
      default: priority.Normal
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Author is Required'],
      unique: false,
    },
    color: {
      type: String,
      required: false,
      unique: false,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag',
        required: false,
      },
    ],
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
    status: {
      type: String,
      enum: status,
      required: [true, 'Status for task is Required'],
      default: status.ToDo
    },
    
  },
  {
    timestamps: true,
  },
);
TaskSchema.pre<TaskDocument>('save', function(next) {
  if (!this.color) {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    this.color = randomColor;
  }
  next();
});



export const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);