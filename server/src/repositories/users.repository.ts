import { PrismaClient } from "@prisma/client";

export class UsersRepository {
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
