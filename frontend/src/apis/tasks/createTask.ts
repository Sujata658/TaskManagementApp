import { TaskProps } from "@/types/Task";
import { axiosInstance } from "../../config/axios";


export const createTask = async (taskProps: TaskProps): Promise<any> => {
  try {
    console.log('createTask api....');
    const response = await axiosInstance.post("/tasks", taskProps);
    return response.data;
  } catch (error) {
    throw error; 
  }
};








