import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TOKEN } from "../config";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthorizedUser } from "../models/express.extension";
import { ITokenPayload, Permission } from "../models/auth.model";

export class AuthMiddleware {
  constructor(private authRepository: AuthRepository) {}

  privateRoute(permissions?: Permission[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies[TOKEN];
      if (!token) return void res.status(401).send({ message: "Token required" });

      const payload = jwt.decode(token, { json: true }) as ITokenPayload;
      if (!payload) return void res.status(400).clearCookie(TOKEN).send({ message: "Token error" });

      const { id } = payload;
      const user = await this.authRepository.getAuthorizedUser(id);
      if (!user) return void res.status(404).send({ message: "User not found" });

      if (permissions && permissions.length && this.validatePermissions(user, permissions))
        return void res.status(403).send({ message: "Isufficient permissions" });

      req.user = user;
      next();
    };
  }

  validatePermissions(user: AuthorizedUser, permissions: Permission[]): boolean {
    let result = true;
    permissions.forEach((permission) => {
      if ((user.role.permission & permission) !== permission) result = false;
    });
    return result;
  }
}
