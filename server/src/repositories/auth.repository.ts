import { PrismaClient, User } from "@prisma/client";
import { Repository } from "../models/repository.model";

export class AuthRepository implements Repository {
  constructor() {}

  prisma = new PrismaClient();

  async createUser(userData: Omit<User, "id" | "roleId">) {
    const user = await this.prisma.user.create({ data: userData });
    return user;
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return user;
  }

  async getAuthorizedUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
      omit: { password: true },
    });
    return user;
  }
}
