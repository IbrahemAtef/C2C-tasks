import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../../modules/auth/util/jwt.util";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Error("Missing Authorization header")); //TODO: custom error
  }
  const jwt = authHeader.replace(`Bearer `, "");
  try {
    const payload = verifyJWT(jwt);
    req.user = payload;
    next();
    return;
  } catch (error) {
    return next(new Error("Invalid or expired token"));
  }
  //   next(
  //     new CustomError(
  //       "user is not Authenticated",
  //       "AUTH",
  //       HttpErrorStatus.Unauthorized
  //     )
  //   );
};
