import { axiosInstance } from "../../config/axios";
import {LoginData} from "@/types/LoginUser";


export const loginapi = async (loginData: LoginData): Promise<any> => {
  try {
    console.log('Login api....');
    const response = await axiosInstance.post("/auth/login", loginData,{
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    throw error; 
  }
};








