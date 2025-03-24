import axios from "axios";
import { ILoginFields } from "./api.models";

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
  },
};
