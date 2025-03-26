import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UsersController {
  constructor(private usersService: UserService) {}

  getByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  };
}
