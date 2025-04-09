import { Router } from "express";
import { TaskRepository } from "../repositories/task.repository";
import { TaskService } from "../services/task.service";
import { TaskController } from "../controllers/task.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { AuthRepository } from "../repositories/auth.repository";

const taskRouter = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const authRepository = new AuthRepository();
const authMiddleware = new AuthMiddleware(authRepository);

taskRouter.get("/user/:username", taskController.getByUsername);
taskRouter.get("/item/:id", taskController.getById);
taskRouter.patch("/item/:id", authMiddleware.privateRoute(), taskController.patchById);
taskRouter.delete("/item/:id", authMiddleware.privateRoute(), taskController.deleteById);
taskRouter.post(
  "/item",
  authMiddleware.privateRoute(),
  taskController.validateCreate,
  taskController.create
);

export default taskRouter;
