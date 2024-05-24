import { messages } from "../../../../utils/Messages";
import CustomError from "../../../../utils/Error";
import { createTag,  getTagById, getAllTags, getTasksByTag } from "./repository";

const TagsServices = {
    createTag(taskId:string, tagName: string){
        return createTag(taskId, tagName)
    },
    getTag(taskId: string){
        return getTagById(taskId)
    },
    getAllTags(){
        return getAllTags()
    },
    async getTasksByTag(tagId: string){
        const tag = await getTagById(tagId)

        if(!tag) throw new CustomError(messages.tag.not_found, 404)

        return getTasksByTag(tagId)
    }

}
export default TagsServices;