import { PrismaClient } from "@prisma/client";
import { Repository } from "../models/repository.model";
import { Task } from "@prisma/client";

export class TaskRepository implements Repository {
  prisma = new PrismaClient();

  getByUsername = async (username: string) => {
    try {
      return await this.prisma.task.findMany({ where: { user: { username } } });
    } catch (error) {
      return null;
    }
  };

  getById = async (id: string) => {
    try {
      return await this.prisma.task.findUnique({ where: { id } });
    } catch {
      return null;
    }
  };

  deleteById = async (id: string) => {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch {
      return null;
    }
  };

  patchById = async (id: string, data: Partial<Task>) => {
    try {
      return await this.prisma.task.update({ where: { id }, data });
    } catch {
      return null;
    }
  };

  create = async (data: Pick<Task, "title" | "userId">) => {
    try {
      return await this.prisma.task.create({ data });
    } catch {
      return null;
    }
  };
}
