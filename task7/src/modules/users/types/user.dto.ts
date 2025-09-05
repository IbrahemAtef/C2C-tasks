import { IUser } from "./../user.entity";

export type ProtectedUser = Omit<IUser, "password" | "role">;

export type UpdateUserData = Partial<ProtectedUser>;

export type CreateUser = Pick<IUser, "name" | "email" | "password">;
