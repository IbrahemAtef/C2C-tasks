import { Request, Response, NextFunction } from "express";
import { Role } from "../../modules/users/util/user.types";
import { CustomError } from "../utils/exception";
import { HttpErrorStatus } from "../utils/util.types";

export const requireRole = (roles: Array<Role>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      return next(
        new CustomError(
          "Forbidden: insufficient role",
          "AUTH",
          HttpErrorStatus.Forbidden
        )
      );
    }
    next();
  };
};
