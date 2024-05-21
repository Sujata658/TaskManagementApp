import { Response, Request } from 'express';
import { errorHandler } from '../../../utils/Error/index';
import { User } from './model';
import UserService from './service';
import { successResponse } from '../../../utils/HttpResponse';
import { messages } from '../../../utils/Messages';

const UserController = {
    async createUser(req: Request<unknown, unknown, User>, res: Response) {
        try {
            const body = req.body;

            const result = await UserService.createUser(body);
            return successResponse({
                response: res,
                message: messages.user.creation_success,
                data: result,
            });
        } catch (error) {
            errorHandler(res, error);
        }
    },
    async getUser(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            const result = await UserService.getUser(id);
            return successResponse({
                response: res,
                message: messages.user.one_get_success,
                data: result,
            });
        } catch (error) {
            errorHandler(res, error);
        }
    },
    async getUsers(req: Request, res: Response) {
        try {
            const result = await UserService.getUsers();
            return successResponse({
                response: res,
                message: messages.user.all_get_success,
                data: result,
            });
        } catch (error) {
            errorHandler(res, error);
        }
    },
    async deleteUser(req: Request<{ id: string }>, res: Response) {
        try {
            const { id } = req.params;

            await UserService.deleteUser(id);
            return successResponse({
                response: res,
                message: messages.user.delete_success,
            });
        } catch (error) {
            errorHandler(res, error);
        }
    },
    // async updateUser(req: Request<{id: string}, unknown, Partial<User> > , res: Response) {
    //   try {
    //     const { id } = req.params;
    //     const body = req.body;

    //     const result = await UserService.updateUser(id, body);
    //     return successResponse({
    //       response: res,
    //       message: messages.user.update_success,
    //       data: result,
    //     });
    //   } catch (error) {
    //     errorHandler(res, error);
    //   }
    // },





    //   async getMyposts(req: Request, res: Response){
    //     const userId = res.locals.user._id

    //     const result = await UserService.getMyposts(userId)
    //     return successResponse({
    //       message: messages.user.my_posts_found,
    //       response: res,
    //       data:result
    //     })



    //   },
};

export default UserController;