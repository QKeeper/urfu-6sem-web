import { PrismaClient, User } from "@prisma/client";

export class AuthRepository {
  constructor() {}

  prisma = new PrismaClient();

  async createUser(userData: Omit<User, "id">) {
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
