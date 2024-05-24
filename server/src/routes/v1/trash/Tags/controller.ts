import { NextFunction, Request, Response } from "express";
import CustomError, { errorHandler } from "../../../../utils/Error";
import InputValidation from "../../../../utils/InputValidation";
import { messages } from "../../../../utils/Messages";
import { successResponse } from "../../../../utils/HttpResponse";
import TagsServices from "./service";

const TagsController = {
    async createTag(req: Request<unknown, unknown, { name: string, taskId: string }>, res: Response, next: NextFunction) {
        try {
            const { name, taskId } = req.body;

            InputValidation.validateid(taskId)


            const result = await TagsServices.createTag(taskId, name)

            if (!result) throw new CustomError(messages.tag.creation_failed, 500)

            return successResponse({
                message: messages.tag.creation_success,
                response: res,
                data: result,
                status: 201
            })

        } catch (error) {
            next(errorHandler(res, error))
        }

    },
    async getTag(req: Request<{ taskId: string }, unknown, unknown>, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.params;
            InputValidation.validateid(taskId)

            const result = await TagsServices.getTag(taskId);
            if (!result) throw new CustomError(messages.tag.not_found, 404)
            return successResponse({
                message: messages.tag.creation_success,
                response: res,
                data: result,
                status: 200
            })

        } catch (error) {
            next(errorHandler(res, error))
        }
    },
    async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
        const result = await TagsServices.getAllTags()
        return successResponse({
            message: messages.tag.tags_found,
            response: res,
            data: result,
            status: 200
        })
        
    } catch (error) {
        next(errorHandler(res, error))
    }},
    async getTasksByTag(req: Request<{tagId: string}>, res: Response, next:NextFunction){
        try {
            const {tagId} = req.params
            InputValidation.validateid(tagId)

            const result = await TagsServices.getTasksByTag(tagId)
            return successResponse(
                {
                    message: messages.tag.tasks_found,
                    response: res,
                    data: result,
                    status: 200
                }
            )
            
        } catch (error) {
            next(errorHandler(res, error))
        }
    }
}
export default TagsController;