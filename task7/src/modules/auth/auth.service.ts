import { CustomError } from "../../shared/utils/exception";
import { removeFields } from "../../shared/utils/object.util";
import { HttpErrorStatus } from "../../shared/utils/util.types";
import { userService } from "../users/user.service";
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
} from "./types/auth.dto";
import { verifyArgonHash } from "./util/argon.util";

export class AuthService {
  private _userService = userService;

  public async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
    return this._userService.createUser(payload, "STUDENT");
  }

  public async login(payload: LoginDTO): Promise<LoginResponseDTO | null> {
    const foundUser = this._userService.findUserByEmail(payload.email);

    if (!foundUser)
      throw new CustomError(
        "User profile not found",
        "AUTH",
        HttpErrorStatus.NotFound
      );

    const isPasswordMatch = await verifyArgonHash(
      payload.password,
      foundUser.password
    );
    // match payload password with hashed password
    if (!isPasswordMatch) return null;

    return removeFields(foundUser, ["password"]);
  }
}
