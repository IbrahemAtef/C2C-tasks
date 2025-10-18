import { PUser } from "./../user.entity";

export type ProtectedUser = Omit<PUser, "password" | "role">;

export type CreateUser = Pick<PUser, "name" | "email" | "password">;

export type UpdateUserData = Partial<CreateUser>;
