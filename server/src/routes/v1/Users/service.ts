import CustomError from '../../../utils/Error';
import InputValidation from '../../../utils/InputValidation';
import { User } from './model';
import { createUserRepo, getAllUsers, getUserByEmail, getUserById,  deleteUser } from './repository';
import { messages } from '../../../utils/Messages';

const UserService = {
  async createUser(userData: User) {
    InputValidation.validateUser(userData)

    const user = getUserByEmail(userData.email);
    if (await user) {
      throw new CustomError(messages.user.email_exist, 400);
    }

    return createUserRepo(userData);
  },

  async getUser(id: string) {
    InputValidation.validateid(id)
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return user;
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