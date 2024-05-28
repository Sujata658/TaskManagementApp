import { messages } from "../../../utils/Messages";
import CustomError from "../../../utils/Error";
import { createTag,  getTagById, getAllTags, getTasksByTag } from "./repository";

const TagsServices = {
    createTag(tagName: string){
        return createTag( tagName)
    },
    getTag(tagId: string){
        return getTagById(tagId)
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