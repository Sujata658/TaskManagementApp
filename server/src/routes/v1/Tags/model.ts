import mongoose from 'mongoose';

export interface Tag {
    name: string;
}

const TagSchema = new mongoose.Schema<Tag>(
    {
        name: {
            type: String,
            required: [true, 'Title is Required'],
            unique: false,
        },
    },
    {
        timestamps: true,
    },
);

export const TagModel = mongoose.model<Tag>('Tag', TagSchema);