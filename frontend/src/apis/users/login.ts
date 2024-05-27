import { axiosInstance } from "../../config/axios";


export const loginapi = async (loginData: LoginData): Promise<any> => {
  try {
    console.log('Login api....');
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};








