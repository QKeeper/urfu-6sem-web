import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { TOKEN } from "../config";
import { body } from "express-validator";
import { validate } from "../utils/validate";

export class AuthController {
  constructor(private authService: AuthService) {}

  private validateUsername = body("username")
    .trim()
    .isString()
    .withMessage("Must be a string")
    .isLength({ min: 3 })
    .withMessage("At least 3 characters length")
    .toLowerCase();

  private validatePassword = body("password")
    .trim()
    .isString()
    .withMessage("Must be a string")
    .isLength({ min: 6 })
    .withMessage("At least 6 characters length");

  validateRegister = [this.validateUsername, this.validatePassword, validate];
  validateLogin = [this.validateUsername, this.validatePassword, validate];

  async register(req: Request, res: Response) {
    try {
      const { token } = await this.authService.createUser(req.body);
      return void res
        .cookie(TOKEN, token, { secure: true, httpOnly: true, sameSite: "strict" })
        .sendStatus(200);
    } catch (error) {
      console.error(error);
      return void res.status(500).json({ message: "Failed to create user" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { token } = await this.authService.loginUser(req.body);
      return void res
        .cookie(TOKEN, token, { secure: true, httpOnly: true, sameSite: "strict" })
        .sendStatus(200);
    } catch (error) {
      console.error(error);
      return void res.status(500).json({ message: "Failed to login user" });
    }
  }

  async logout(_: Request, res: Response) {
    return void res
      .clearCookie(TOKEN, { secure: true, httpOnly: true, sameSite: "strict" })
      .sendStatus(200);
  }

  async me(req: Request, res: Response) {
    return void (req.cookies.token ? res.send(req.user) : res.sendStatus(401));
  }
}
