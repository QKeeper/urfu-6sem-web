import { apiClient } from "@/api";
import { IUser } from "./authModel";

export const authAPI = {
  getMe: async () => {
    const response = await apiClient.get<IUser>("/auth/me");
    return response.data;
  },
};
