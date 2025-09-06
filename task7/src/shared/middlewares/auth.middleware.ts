import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../../modules/auth/util/jwt.util";
import { CustomError } from "../utils/exception";
import { HttpErrorStatus } from "../utils/util.types";

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

  try {
    const payload = verifyJWT(jwt);

    req.user = payload;

    next();
    return;
  } catch (error) {
    return next(
      new CustomError(
        "Invalid or expired token",
        "AUTH",
        HttpErrorStatus.Unauthorized
      )
    );
  }
};
