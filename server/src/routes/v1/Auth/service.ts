import CustomError from '../../../utils/Error';
import { getUserByEmail } from '../Users/repository';
import { Auth } from './types';
import { messages } from '../../../utils/Messages';
import { signJwt, verifyJwt } from '../../../utils/Jwt';
import { omit } from '../../../utils';
import { userPrivateFields } from '../Users/model';
import InputValidation from '../../../utils/InputValidation';

const AuthService = {
  async login(data: Auth) {
    InputValidation.validateAuth(data);
    const user = await getUserByEmail(data.email);
    if (!user) throw new CustomError(messages.auth.invalid_account, 401);

    const isValid = await user.comparePassword(data.password);
    if (!isValid) throw new CustomError(messages.auth.invalid_account, 401);

    const accessToken = signJwt(omit(user.toJSON(), userPrivateFields), 'accessToken', { expiresIn: '3d' });
    const refreshToken = signJwt({ userId: user._id?.toString() }, 'refreshToken', { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  },
  async refreshToken(token: string) {
    const user = verifyJwt(token, 'refreshToken');
    if (!user) throw new CustomError(messages.auth.refresh_token_expired, 401);
  },

  async verifyToken(token: string, type: 'accessToken' | 'refreshToken') {
    const user = verifyJwt(token, type);
    if (!user) throw new CustomError(messages.auth.invalid_token, 401);
    return user
  },

  async renewAccessToken(token: string) {
    try {
      const user = await this.verifyToken(token, 'refreshToken')

      if (!user) throw new CustomError(messages.auth.refresh_token_expired, 401);


      const accessToken = signJwt({
        userId:
          user
      }, 'accessToken', { expiresIn: '3d' });

      return {
        accessToken
      }

    } catch (error) {
      throw new CustomError(messages.auth.refresh_token_expired, 401);
    }

  }
};

export default AuthService;
