import axios from "axios";
import { ILoginFields } from "./api.models";
import { IUser } from "./features/auth/authModel";

const baseURL = import.meta.env.PROD ? "/api" : "http://localhost:3000/api";

export const apiClient = axios.create({ baseURL, withCredentials: true });

if (import.meta.env.DEV) {
  apiClient.interceptors.request.use(async (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(config);
      }, 1000);
    });
  });
}

export const API = {
  Auth: {
    login: async (data: ILoginFields) => {
      const response = await apiClient.post<ILoginFields>("/auth/login", data);
      return response.data;
    },
    register: async (data: ILoginFields) => {
      const response = await apiClient.post<ILoginFields>("/auth/register", data);
      return response.data;
    },
    me: async () => {
      const response = await apiClient.get<IUser>("/auth/me");
      return response.data;
    },
    logout: async () => {
      const response = await apiClient.post("/auth/logout");
      return response.data;
    },
  },
  User: {
    getByUsername: async (username: string) => {
      const response = await apiClient.get<IUser | null>("/users/" + username);
      return response.data;
    },
  },
};
