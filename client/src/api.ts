import axios from "axios";
import { ILoginFields, IRegisterFields } from "./api.models";
import { ITask } from "./features/tasks/tasksModel";
import { IUser } from "./features/auth/authModel";

const baseURL = import.meta.env.PROD ? "/api" : "http://localhost:3000/api";
export const apiClient = axios.create({ baseURL, withCredentials: true });

if (import.meta.env.DEV) {
  apiClient.interceptors.request.use(async (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(config);
      }, 100);
    });
  });
}

export const API = {
  Auth: {
    login: async (data: ILoginFields) => {
      const response = await apiClient.post<ILoginFields>("/auth/login", data);
      return response.data;
    },
    register: async (data: IRegisterFields) => {
      const response = await apiClient.post<Omit<IRegisterFields, "confirmPassword">>("/auth/register", data);
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
  Task: {
    getByUsername: async (username: string) => {
      const response = await apiClient.get("/tasks/user/" + username);
      return response.data;
    },
    getMy: async () => {
      const response = await apiClient.get<ITask[]>("/tasks");
      return response.data;
    },
    getById: async (id: string) => {
      const response = await apiClient.get("/tasks/" + id);
      return response.data;
    },
    modify: async (id: string, data: Partial<Omit<ITask, "userId">>) => {
      const response = await apiClient.patch("/tasks/" + id, data);
      return response.data;
    },
    delete: async (id: string) => {
      const response = await apiClient.delete("/tasks/" + id);
      return response.data;
    },
    create: async (data: Pick<ITask, "title">) => {
      const response = await apiClient.post("/tasks", data);
      return response.data;
    },
  },
};
