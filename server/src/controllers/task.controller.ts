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

  getMy = async (req: Request, res: Response) => {
    if (!req.user) {
      res.sendStatus(401);
      return;
    }
    const result = await this.service.getByUsername(req.user.username);
    if (result) res.send(result);
    else res.sendStatus(404);
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

    const task = await this.service.getById(id);

    if (!req.user || !task || req.user.id !== task.userId) {
      res.status(403).send({ message: "Access denied" });
      return;
    }

    const result = await this.service.deleteById(id);

    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  };

  patchById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { title, completed, userId } = req.body;
    const result = await this.service.patchById(id, { title, completed, userId });

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
