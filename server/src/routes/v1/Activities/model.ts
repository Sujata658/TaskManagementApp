import mongoose, { Schema, Types, Document, model } from 'mongoose';

export interface Activity extends Document {
  action: string;
  author: Types.ObjectId;
  actionOn: Types.ObjectId;
  actionOnModel: 'Task' | 'Comment';
  details?: string;
  from?: string;
  to?: string;
}

const ActivitySchema = new Schema<Activity>(
  {
    action: {
      type: String,
      required: [true, 'Action is required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Author is required'],
    },
    actionOn: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'ActionOn is required'],
      refPath: 'actionOnModel',
    },
    actionOnModel: {
      type: String,
      required: true,
      enum: ['Task', 'Comment'],
    },
    details: {
      type: String,
      required: false,
    },
    from: {
      type: String,
      required: false,
    },
    to: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ActivityModel = model<Activity>('Activity', ActivitySchema);
