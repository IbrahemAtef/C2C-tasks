import { HttpErrorStatus } from "./../../shared/utils/util.types";
import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { CustomError } from "../../shared/utils/exception";

export class UserController {
  private _userService = userService;

  getUserProfile = (req: Request, res: Response, next: NextFunction) => {
    const sub = req.user?.sub;
    if (!sub)
      throw new CustomError(
        "Unauthorized: Missing or invalid token",
        "USER",
        HttpErrorStatus.Unauthorized
      );
    //TODO:  use zodValidation
    const user = this._userService.getUserProfile(sub);
    res.ok(user);
  };

  updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
    const sub = req.user?.sub;
    if (!sub)
      throw new CustomError(
        "Unauthorized: Missing or invalid token",
        "USER",
        HttpErrorStatus.Unauthorized
      );
    const user = this._userService.updateUser(sub, req.body);
    res.create(user);
  };

  createCoach = (req: Request, res: Response, next: NextFunction) => {
    const user = this._userService.createUser(req.body, "COACH");
    res.create(user);
  };
}
