import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ROUNDS, SECRET } from "../config";
import { ITokenPayload } from "../models/auth.model";
import { AuthRepository } from "../repositories/auth.repository";
import { User } from "@prisma/client";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  createUser = async (userData: Omit<User, "id" | "roleId">) => {
    userData.password = bcrypt.hashSync(userData.password, ROUNDS);
    const user = await this.authRepository.createUser(userData);
    const token = this.generateToken(user);
    return { token };
  };

  loginUser = async (data: Record<string, any>) => {
    const { username, password } = data;
    const user = await this.authRepository.getUserByUsername(username);
    if (!user) throw new Error("User not found");
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    const token = this.generateToken(user);
    return { token };
  };

  generateToken = (payload: { id: string }) => {
    const { id }: ITokenPayload = payload;
    return jwt.sign({ id }, SECRET, { expiresIn: "1d" });
  };
}
