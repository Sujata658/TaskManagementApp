import CustomError from '../../../utils/Error';
import { createUserRepo, generateCode, getUserByEmail } from '../Users/repository';
import { Auth } from './types';
import { messages } from '../../../utils/Messages';
import { signJwt, verifyJwt } from '../../../utils/Jwt';
import { omit } from '../../../utils';
import { User, userPrivateFields } from '../Users/model';
import { sendMail } from '../../../config/sendMail';


const unverifiedUsers: Map<string, { userData: User; code: string }> = new Map();

const AuthService = {
  async signup(data: User) {
    const user = await getUserByEmail(data.email);
    if (user) throw new CustomError(messages.user.email_exist, 400);

    const code = generateCode().toString();

    await createUserRepo(data)

    unverifiedUsers.set(data.email, {userData: data, code });

    await sendMail(data.email, 'Verify Email', `Your verification code is ${code}`);

    const { password, ...userData } = data;

    return userData;

  },
  async login(data: Auth) {
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

  },
  
};

export default AuthService;
export { unverifiedUsers}
