import { Task } from "@/types/Task";
import { axiosInstance } from "../../config/axios";
import { Response } from "@/types/Task";
import { CommentProps } from "./create";

export const createComment = async (taskId: string,commentId:string, commentProps: CommentProps): Promise<Response<Task>> => {
  try {
    console.log('createTask api....');
    const response = await axiosInstance.post(`/tasks/${taskId}/comments/${commentId}`, commentProps);
    return response.data as Response<Task>;
  } catch (error) {
    throw error;
  }
};







