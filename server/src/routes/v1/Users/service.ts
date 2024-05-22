import CustomError from '../../../utils/Error';
import InputValidation from '../../../utils/InputValidation';
// import { User } from './model';
import { createUserRepo, getAllUsers, getUserByEmail, getUserById,  deleteUser} from './repository';
import { messages } from '../../../utils/Messages';
// import {sendMail} from '../../../config/sendMail';
import { unverifiedUsers } from '../Auth/service';

// const unverifiedUsers: Map<string, { userData: User; code: string }> = new Map();

const UserService = {
  // async sendOtp(userData: User) {
  //   InputValidation.validateUser(userData)

  //   const user = getUserByEmail(userData.email);
  //   if (await user) {
  //     throw new CustomError(messages.user.email_exist, 400);
  //   }

  //   const code = generateCode().toString();

  //   unverifiedUsers.set(userData.email, { userData, code });

  //   await sendMail(userData.email, 'Verify Email', `Your verification code is ${code}`);
  // },
  async verifyOtp(email: string, otp: string) {
    const record = unverifiedUsers.get(email);

    if (!record) {
        throw new CustomError(messages.auth.invalid_otp, 400);
    }

    if (record.code !== otp) {
        throw new CustomError(messages.auth.invalid_otp, 400);
    }

    const createdUser = await createUserRepo(record.userData);

    unverifiedUsers.delete(email);

    return createdUser;
},

  async getUser(id: string) {
    InputValidation.validateid(id)
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return user;
  },
  async getUserByEmail(email: string) {
    return getUserByEmail(email);
  },

  getUsers() {
    return getAllUsers();
  },
  async deleteUser(id: string) {
    InputValidation.validateid(id);
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return deleteUser(id);
  },
  // updateUser(id: string, userData: Partial<User>) {
  //   InputValidation.validateid(id);
  //   const updateData: Partial<User> = {};
  //   if (userData.name) {
  //     updateData.name = userData.name;
  //   }

  //   return updateUser(id, updateData);
  // },


  //   getMyposts(userId: string){
  //     return getMyposts(userId);

  //   },
};

export default UserService;