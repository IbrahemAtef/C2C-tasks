import { coachProfileSchema, profileUpdateSchema } from "./util/user.schema";
import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { zodValidation } from "../../shared/utils/zod.util";
import { CreateUser, UpdateUserData } from "./types/user.dto";

export class UserController {
  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const sub = req.user!.sub;

    const user = await userService.getUserProfile(sub);

    res.ok(user);
  };

  updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const sub = req.user!.sub;

    const payload = zodValidation<UpdateUserData>(
      profileUpdateSchema,
      req.body,
      "USER"
    );

    const user = await userService.updateUser(sub, payload);

    res.ok(user);
  };

  createCoach = async (req: Request, res: Response, next: NextFunction) => {
    const payloadData = zodValidation<CreateUser>(
      coachProfileSchema,
      req.body,
      "USER"
    );

    const user = await userService.createUser(payloadData, "COACH");

    res.create(user);
  };
}
