import { Task } from "@/types/Task";
import { axiosInstance } from "../../config/axios";
import { Response } from "@/types/Task";

export const updateTask = async (taskId: string,taskProps: Partial<Task>): Promise<Response<Task>> => {
  try {
    console.log('editTask api....');
    const response = await axiosInstance.post(`/tasks/${taskId}`, taskProps);
    return response.data as Response<Task>;
  } catch (error) {
    throw error;
  }
};







