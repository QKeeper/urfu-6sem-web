import { PrismaClient } from "@prisma/client";

export async function initializeDatabase() {
  try {
    const prisma = new PrismaClient();
    const result = await prisma.userRole.findFirst({ where: { id: 0 } });
    if (!result) {
      await prisma.userRole.create({ data: { id: 0, name: "default", permission: 1 } });
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
