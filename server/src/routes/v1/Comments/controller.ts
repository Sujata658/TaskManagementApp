import  { errorHandler } from '../../../utils/Error/index';
import { Request, Response } from 'express';
import { CommentsService } from './service';
import { Comment } from './model';
import { successResponse } from '../../../utils/HttpResponse';
import { messages } from '../../../utils/Messages';
// import InputValidation from 'utils/InputValidation';

const CommentsController = {
  async createComment(req: Request<{taskId: string}, unknown, Comment>, res: Response) {
    try {
      const { taskId } = req.params;

      const body = req.body;

      const userId = res.locals.user._id as string;

      const result = await CommentsService.createComment(body, taskId, userId);
      if (!result) throw new Error(messages.comment.creation_failed);

      return successResponse({
        response: res,
        message: messages.comment.creation_success,
        data: result,
        status: 201,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  async updateComment(req: Request<{taskId:string , id: string}, unknown, Partial<Comment>>, res: Response) {
    try {
      const {taskId, id} = req.params

      const data = req.body

      const userId = res.locals.user._id as string;

      const result = await CommentsService.updateComment(id,taskId, data, userId) 
      return successResponse({
        response: res,
        message: messages.comment.edit_success,
        data: result,
        status: 200
      })


    } catch (error) {
      errorHandler(res, error);
    }
  },

  async deleteComment(req: Request<{taskId: string, id:string}>, res: Response) {
    try {
      const {taskId, id} = req.params
      const userId = res.locals.user._id as string;

      await CommentsService.deleteComment(id,taskId, userId) 
      return successResponse({
        response: res,
        message: messages.comment.delete_success,
        status: 200
      })


    } catch (error) {
      errorHandler(res, error);
    }
  },
};

export default CommentsController;
