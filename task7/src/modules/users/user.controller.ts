import { coachProfileSchema } from "./util/user.schema";
import { HttpErrorStatus } from "./../../shared/utils/util.types";
import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { CustomError } from "../../shared/utils/exception";
import { zodValidation } from "../../shared/utils/zod.util";
import { CreateUser } from "./types/user.dto";

export class UserController {
  private _userService = userService;

  seedAdmin = () => {
    this._userService.seedAdmin();
  };

  // ? ASK: Is it better to create AuthRequest type or merging existing Request with user data? like this
  //?  export interface AuthRequest extends Request {
  //?    user?: JwtPayload;
  //?  }
  getUserProfile = (req: Request, res: Response, next: NextFunction) => {
    const sub = req.user?.sub;

    if (!sub)
      throw new CustomError(
        "Unauthorized: Missing or invalid token",
        "USER",
        HttpErrorStatus.Unauthorized
      );

    //? ASK:  How to use zodValidation for req.user validation ?
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
    const payloadData = zodValidation<CreateUser>(
      coachProfileSchema,
      req.body,
      "USER"
    );

    const user = this._userService.createUser(payloadData, "COACH");

    res.create(user);
  };
}
