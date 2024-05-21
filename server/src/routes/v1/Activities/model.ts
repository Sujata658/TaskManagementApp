import mongoose, { Document, Types } from 'mongoose';

export interface Activity {
  name: string;
  author: Types.ObjectId;
}

export interface ActivityDocument extends Document, Activity {
}

const ActivitySchema = new mongoose.Schema<ActivityDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      unique: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Author is Required'],
      unique: false,
    },
  },
  {
    timestamps: true,
  },
);

export const ActivityModel = mongoose.model<ActivityDocument>('Activity', ActivitySchema);