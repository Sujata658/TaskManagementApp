import {  TagModel } from "./model";

export const createTag = (taskId: string, tagName: string)=>{
    const newTag = new TagModel({
        name: tagName,
        tasks: taskId
    })
    return newTag.save()

}

export const getTagById=( taskId: string)=>{
    return TagModel.find({taskId})
}

export const getAllTags=()=>{
    return TagModel.find()
}
export const getTasksByTag=(tagId: string)=>{
    return TagModel.find(
        {tagId}
    ).populate({path: 'tasks', select: 'title description priority duedate createdAt'})
}