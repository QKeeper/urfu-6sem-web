import { Router } from "express";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const authRouter = Router();

// Dependency Injection
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware(authRepository);

authRouter.post("/register", authController.validateRegister, authController.register);
authRouter.post("/login", authController.validateLogin, authController.login);
authRouter.post("/logout", authMiddleware.privateRoute(), authController.logout);
authRouter.get("/me", authMiddleware.privateRoute(), authController.me);

export default authRouter;
