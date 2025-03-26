import { Router } from "express";
import { UsersRepository } from "../repositories/users.repository";
import { UserService } from "../services/user.service";
import { UsersController } from "../controllers/users.controller";

const usersRouter = Router();

const userRepository = new UsersRepository();
const userService = new UserService(userRepository);
const userController = new UsersController(userService);

usersRouter.get("/:username", userController.getByUsername);

export default usersRouter;
