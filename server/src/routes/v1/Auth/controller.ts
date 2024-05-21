import { Request, Response } from 'express';
import { Auth } from './types';
import {  successResponse } from '../../../utils/HttpResponse';
import { messages } from '../../../utils/Messages';
import { errorHandler } from '../../../utils/Error/index';
import AuthService from './service';

const AuthController = {
  async login(req: Request<unknown, unknown, Auth>, res: Response) {
    try {
      const body = req.body;
      const result = await AuthService.login(body);
      return successResponse({
        status: 200,
        response: res,
        message: messages.auth.login_success,
        data: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  },
  async renewAccessToken(req: Request<{token: string}>, res: Response) {
    try {
      const refreshToken = req.body.token;
      
      const result = await AuthService.renewAccessToken(refreshToken);
      return successResponse({
        status: 200,
        response: res,
        message: messages.auth.refresh_success,
        data: result,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  }
};

export default AuthController;
