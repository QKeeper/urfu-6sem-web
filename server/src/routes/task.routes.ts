import { Router } from "express";
import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { AuthRepository } from "../repositories/auth.repository";
import { Permission } from "../models/auth.model";

const taskRouter = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const authRepository = new AuthRepository();
const authMiddleware = new AuthMiddleware(authRepository);

taskRouter.get(
  "/user/:username",
  authMiddleware.privateRoute([Permission.MANAGE_USERS]),
  taskController.getByUsername
);
taskRouter.get("/:id", taskController.getById);
taskRouter.get("/", authMiddleware.privateRoute(), taskController.getMy);
taskRouter.patch("/:id", authMiddleware.privateRoute(), taskController.patchById);
taskRouter.delete("/:id", authMiddleware.privateRoute(), taskController.deleteById);
taskRouter.post(
  "/",
  authMiddleware.privateRoute(),
  taskController.validateCreate,
  taskController.create
);

export default taskRouter;
