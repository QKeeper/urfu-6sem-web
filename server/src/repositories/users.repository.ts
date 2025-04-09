import { PrismaClient } from "@prisma/client";
import { Repository } from "../models/repository.model";

export class UsersRepository implements Repository {
  prisma = new PrismaClient();

  getUserByUsername = async (username: string) => {
    try {
      return await this.prisma.user.findUnique({ where: { username }, omit: { password: true } });
    } catch (err) {
      console.error(err);
      return null;
    }
  };
}
