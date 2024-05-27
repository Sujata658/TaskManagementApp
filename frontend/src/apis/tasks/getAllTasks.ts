import { axiosInstance } from "../../config/axios";


export const getAllTasks = async (): Promise<any> => {
  try {
    console.log('getAllTasks api....');
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    throw error; 
  }
};








