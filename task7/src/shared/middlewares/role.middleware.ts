import { Request, Response, NextFunction } from "express";
import { Role } from "../../modules/users/util/user.types";

export const requireRole = (roles: Array<Role>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new Error("Unauthorized"));
    if (!roles.includes(req.user.role)) {
      return next(new Error("Forbidden: insufficient role"));
    }
    next();
  };
};
