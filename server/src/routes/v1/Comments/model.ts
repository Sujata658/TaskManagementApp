import mongoose, {  Types } from 'mongoose';

export interface Comment {
  content: String;
  author: Types.ObjectId;
  activities: [];
}
const CommentSchema = new mongoose.Schema<Comment>(
  {
    content: {
      type: String,
      required: [true, 'Content is Required'],
      unique: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Author is Required'],
      unique: false,
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activity',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const CommentModel = mongoose.model<Comment>('Comment', CommentSchema);