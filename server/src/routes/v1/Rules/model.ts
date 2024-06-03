import mongoose, { Types } from 'mongoose';

export interface Rules {
  rules: {
    [key: string]: Array<string>;
  
  },
  author: Types.ObjectId;
}



const RulesSchema = new mongoose.Schema<Rules>(
  {
    rules: {
      type: Object,
      required: [true, 'Rules are Required'],
      unique: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
  },
  { timestamps: true },
);

export const RuleModel = mongoose.model<Rules>('Rules', RulesSchema);