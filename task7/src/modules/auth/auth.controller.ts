import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { HttpErrorStatus, StringObject } from "../../shared/utils/util.types";
import {
  LoginDTO,
  LoginResponseDTOWithJWT,
  RegisterDTO,
  RegisterResponseDTO,
} from "./types/auth.dto";
import { zodValidation } from "../../shared/utils/zod.util";
import { loginDTOSchema, registerDTOSchema } from "./util/auth.schema";
import { singJWT } from "./util/jwt.util";

export class AuthController {
  private authService = new AuthService();

  public register = async (
    req: Request<StringObject, StringObject, RegisterDTO>,
    res: Response<RegisterResponseDTO | string>,
    next: NextFunction
  ) => {
    try {
      const payloadData = zodValidation<RegisterDTO>(
        registerDTOSchema,
        req.body,
        "AUTH"
      );
      const user = await this.authService.register(payloadData);
      res.create(user);
    } catch (error) {
      res.error({
        message: "internal server error",
        statusCode: HttpErrorStatus.InternalServerError,
      });
    }
  };
  public loginWithJWT = async (
    req: Request<StringObject, StringObject, LoginDTO>,
    res: Response<LoginResponseDTOWithJWT | string>,
    next: NextFunction
  ) => {
    const payloadData = zodValidation(loginDTOSchema, req.body, "AUTH");
    const userData = await this.authService.login(payloadData);
    if (!userData) {
      res.error({
        message: "wrong credentials",
        statusCode: HttpErrorStatus.BadRequest,
      });
      return;
    }
    const token = singJWT({ sub: userData.id, role: userData.role });
    res.ok({ user: userData, token });
  };
}

export const authController = new AuthController();
