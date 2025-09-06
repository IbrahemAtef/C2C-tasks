import { IUser } from "./user.entity";
import { GenericRepository } from "../../shared/generic_repository";
import { removeFields } from "../../shared/utils/object.util";
import { CreateUser, ProtectedUser, UpdateUserData } from "./types/user.dto";
import { newId, now } from "../../shared/utils/util";
import { createArgonHash } from "../auth/util/argon.util";
import { Role } from "./util/user.types";
import { CustomError } from "../../shared/utils/exception";
import { HttpErrorStatus } from "../../shared/utils/util.types";

class UserService {
  private repository = new GenericRepository<IUser>();

  getUserProfile(id: string): ProtectedUser {
    const userFound = this.repository.findById(id);
    if (!userFound)
      throw new CustomError(
        "User profile not found",
        "USER",
        HttpErrorStatus.NotFound
      );
    return removeFields(userFound, ["password", "role"]);
  }

  updateUser(id: string, payload: UpdateUserData): ProtectedUser {
    const updatedUser = this.repository.update(id, payload);
    if (!updatedUser)
      throw new CustomError(
        "User profile not found",
        "USER",
        HttpErrorStatus.NotFound
      );
    return removeFields(updatedUser, ["password", "role"]);
  }

  findUserByEmail(email: string): IUser | undefined {
    const userFound = this.repository.findByKey("email", email);
    return userFound;
  }

  async createUser(payload: CreateUser, role: Role): Promise<ProtectedUser> {
    const existing = this.repository.findByKey("email", payload.email);

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

    const createdUser = this.repository.create(user);

    return removeFields(createdUser, ["password", "role"]);
  }
  seedAdmin() {
    const existing = this.findUserByEmail("admin@no.com");
    if (!existing) {
      const payload: IUser = {
        id: newId(),
        name: "Admin",
        email: "admin@no.com",
        password: "admin123",
        role: "ADMIN",
        createdAt: now(),
        updatedAt: now(),
      };
      this.repository.create(payload);
      console.log("Seeded ADMIN user");
    } else {
      console.log("Admin user already exists");
    }
  }
}

export const userService = new UserService();
