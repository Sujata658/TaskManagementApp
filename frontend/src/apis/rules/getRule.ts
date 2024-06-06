import { axiosInstance } from "@/config/axios";

export const getRule = async () => {
  try {
    const response = await axiosInstance.get(`/rules`);
    return response.data;
  } catch (error) {
    return (error as any).response.data;
  }
  
};