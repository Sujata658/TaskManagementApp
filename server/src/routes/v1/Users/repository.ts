import { User, UserDocument, UserModel } from './model';

export const createUserRepo = async (userData: User): Promise<Partial<UserDocument>> => {
  const user = new UserModel(userData);

  const userWithPassword = await user.save();

  const { password, ...userWithoutPassword } = userWithPassword.toObject();

  return userWithoutPassword;
};

export const getAllUsers = (): Promise<UserDocument[]> => {
  return UserModel.find({}).select('-password');
};

export const getUserByEmail =  (email: string): Promise<UserDocument | null> => {
  return UserModel.findOne({ email: email });
};
export const getUserById = (id: string): Promise<UserDocument | null> => {
  return UserModel.findById({ _id: id }).select('-password');
}
export const deleteUser = (id: string) => {
    return UserModel.findByIdAndDelete(id);
}


// export const getMyposts = (id: string) =>{
//   return PostModel.find({author: id})
// }
// export const updateUser = (id: string, userData: Partial<User>) => {
//   return UserModel.findByIdAndUpdate(id, userData, { new: true }).select('-password -__v -_id');
// }