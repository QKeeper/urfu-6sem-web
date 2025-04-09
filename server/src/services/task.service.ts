import { Task } from "@prisma/client";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  constructor(private repository: TaskRepository) {}

  getByUsername = (username: string) => {
    return this.repository.getByUsername(username);
  };

  getById = (id: string) => {
    return this.repository.getById(id);
  };

  deleteById = (id: string) => {
    return this.repository.deleteById(id);
  };

  patchById = (id: string, data: Partial<Task>) => {
    return this.repository.patchById(id, data);
  };

  create = (data: Pick<Task, "title" | "userId">) => {
    return this.repository.create(data);
  };
}
