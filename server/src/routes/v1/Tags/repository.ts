import {  TagModel } from "./model";

export const createTag = (tagName: string)=>{
    const newTag = new TagModel({
        name: tagName
    })
    return newTag.save()

}

export const getTagById=( tagId: string)=>{
    return TagModel.find({tagId})
}

export const getAllTags=()=>{
    return TagModel.find()
}
export const getTasksByTag=(tagId: string)=>{
    return TagModel.find(
        {tagId}
    ).populate({path: 'tasks', select: 'title description priority duedate createdAt'})
}