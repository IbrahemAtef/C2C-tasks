import { coachProfileSchema, profileUpdateSchema } from "./util/user.schema";
import { Request, Response, NextFunction } from "express";
import { userService } from "./user.service";
import { zodValidation } from "../../shared/utils/zod.util";
import { CreateUser } from "./types/user.dto";

export class UserController {
  // ? ASK: Is it better to create AuthRequest type or merging existing Request with user data? like this
  //?  export interface AuthRequest extends Request {
  //?    user?: JwtPayload;
  //?  }
  getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    const sub = req.user!.sub;

    //? ASK:  How to use zodValidation for req.user validation ?
    const user = await userService.getUserProfile(sub);

    res.ok(user);
  };

  updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const sub = req.user!.sub;

    const payload = zodValidation(profileUpdateSchema, req.body, "USER");

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
