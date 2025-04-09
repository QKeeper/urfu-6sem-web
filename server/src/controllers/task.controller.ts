import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { Task } from "@prisma/client";
import { validate } from "../utils/validate";
import { body, cookie } from "express-validator";
import cfg from "../config";

export class TaskController {
  constructor(private service: TaskService) {}

  getByUsername = async (req: Request, res: Response) => {
    const { username } = req.body;
    const result = await this.service.getByUsername(username);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.getById(id);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  };

  deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.service.deleteById(id);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  };

  patchById = async (req: Request, res: Response) => {
    const { id } = req.params;

    type TaskFields = Pick<Task, keyof Omit<Task, "userId"> & keyof typeof req.body>;

    const data: TaskFields = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => key in data)
    ) as TaskFields;

    const result = await this.service.patchById(id, data);

    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  };

  create = async (req: Request, res: Response) => {
    const { title }: { title: string } = req.body;
    const userId = req.user!.id;

    try {
      const result = await this.service.create({ title, userId });
      res.send(result);
    } catch {
      res.status(400).send({ message: "Error occured" });
    }
  };

  validateCreate = [
    body("title").notEmpty().withMessage("Required").isString().withMessage("Must be a string"),
    cookie(cfg.TOKEN).notEmpty().withMessage("Auth Required"),
    validate,
  ];
}
