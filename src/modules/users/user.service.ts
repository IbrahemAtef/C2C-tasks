// ? To use prisma repository, uncomment the related lines and comment mongoose related lines
// ? In functions using mongoose, call toJSON() before removing fields
// ? In functions using prisma, remove fields directly from the returned object

// import { PUser } from "./user.entity";
import { removeFields } from "../../shared/utils/object.util";
import { CreateUser, ProtectedUser, UpdateUserData } from "./types/user.dto";
// import { newId, now } from "../../shared/utils/util";
import { createArgonHash } from "../auth/util/argon.util";
import { Role } from "./util/user.types";
import { CustomError } from "../../shared/utils/exception";
import { HttpErrorStatus } from "../../shared/utils/util.types";
// import { userRepository } from "./user.prisma.repository";
import { userMongoRepository as userRepository } from "./user.mongoose.repository";

class UserService {
  async getUserProfile(id: string): Promise<ProtectedUser> {
    const userFound = await userRepository.findById(id);

    if (!userFound)
      throw new CustomError(
        "User profile not found",
        "USER",
        HttpErrorStatus.NotFound
      );

    return removeFields(userFound.toJSON(), [
      "password",
      "role",
    ]) as ProtectedUser;
  }

  async updateUser(
    id: string,
    payload: UpdateUserData
  ): Promise<ProtectedUser> {
    if (payload.password) {
      const hashedValue = await createArgonHash(payload.password);
      payload.password = hashedValue;
    }

    const updatedUser = await userRepository.update(id, payload);

    if (!updatedUser)
      throw new CustomError(
        "User profile not found",
        "USER",
        HttpErrorStatus.NotFound
      );

    return removeFields(updatedUser.toJSON(), [
      "password",
      "role",
    ]) as ProtectedUser;
  }

  async createUser(payload: CreateUser, role: Role): Promise<ProtectedUser> {
    const existing = await userRepository.findByEmail(payload.email);

    if (existing)
      throw new CustomError(
        "Email already in use",
        "USER",
        HttpErrorStatus.Conflict
      );

    const hashedValue = await createArgonHash(payload.password);

    // ? This createUser function is for mongoose repository
    const user = {
      name: payload.name,
      email: payload.email,
      password: hashedValue,
      role,
    };
    // ? This createUser function is for prisma repository
    // const user: PUser = {
    //   id: newId(),
    //   name: payload.name,
    //   email: payload.email,
    //   password: hashedValue,
    //   role,
    //   createdAt: now(),
    //   updatedAt: now(),
    // };

    const createdUser = await userRepository.create(user);

    return removeFields(createdUser, ["password", "role"]);
  }
}

export const userService = new UserService();
