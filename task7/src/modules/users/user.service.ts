import { IUser } from "./user.entity";
import { removeFields } from "../../shared/utils/object.util";
import { CreateUser, ProtectedUser, UpdateUserData } from "./types/user.dto";
import { newId, now } from "../../shared/utils/util";
import { createArgonHash } from "../auth/util/argon.util";
import { Role } from "./util/user.types";
import { CustomError } from "../../shared/utils/exception";
import { HttpErrorStatus } from "../../shared/utils/util.types";
import { userRepository } from "./user.repository";

class UserService {
  getUserProfile(id: string): ProtectedUser {
    const userFound = userRepository.findById(id);
    if (!userFound)
      throw new CustomError(
        "User profile not found",
        "USER",
        HttpErrorStatus.NotFound
      );
    return removeFields(userFound, ["password", "role"]);
  }

  updateUser(id: string, payload: UpdateUserData): ProtectedUser {
    const updatedUser = userRepository.update(id, payload);
    if (!updatedUser)
      throw new CustomError(
        "User profile not found",
        "USER",
        HttpErrorStatus.NotFound
      );
    return removeFields(updatedUser, ["password", "role"]);
  }

  findUserByEmail(email: string): IUser | undefined {
    return userRepository.findByEmail(email);
  }

  async createUser(payload: CreateUser, role: Role): Promise<ProtectedUser> {
    const existing = userRepository.findByKey("email", payload.email);

    if (existing)
      throw new CustomError(
        "Email already in use",
        "USER",
        HttpErrorStatus.Conflict
      );

    const hashedValue = await createArgonHash(payload.password);

    const user: IUser = {
      id: newId(),
      name: payload.name,
      email: payload.email,
      password: hashedValue,
      role,
      createdAt: now(),
      updatedAt: now(),
    };

    const createdUser = userRepository.create(user);

    return removeFields(createdUser, ["password", "role"]);
  }
}

export const userService = new UserService();
