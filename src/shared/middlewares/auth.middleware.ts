import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../../modules/auth/util/jwt.util";
import { CustomError } from "../utils/exception";
import { HttpErrorStatus } from "../utils/util.types";

// TODO: putting all user data in req.user is better
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new CustomError(
        "Missing Authorization header",
        "AUTH",
        HttpErrorStatus.Unauthorized
      )
    );
  }

  const jwt = authHeader.replace(`Bearer `, "");

  const payload = verifyJWT(jwt);

  if (!payload.sub)
    throw new CustomError(
      "Unauthorized: Missing or invalid token",
      "AUTH",
      HttpErrorStatus.Unauthorized
    );

  req.user = payload;

  next();
  return;
};
