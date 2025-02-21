import { User, UserRole } from "@prisma/client";

type UserWithRole = User & { role: UserRole };
export type AuthorizedUser = Omit<UserWithRole, "password">;

declare global {
  declare namespace Express {
    interface Request {
      user: AuthorizedUser | null;
    }
  }
}
