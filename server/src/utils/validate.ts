import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

export function validate(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors: Record<string, string> = {};
    result.array().forEach((error: ValidationError) => {
      if (error.type === "field") errors[error.path] = error.msg;
    });
    return void res.status(422).json(errors);
  }

  next();
}
