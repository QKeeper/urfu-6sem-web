import { PrismaClient } from "@prisma/client";

export interface Repository {
  prisma: PrismaClient;
}
