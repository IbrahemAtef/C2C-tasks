import { IUser } from "./../user.entity";

export type ProtectedUser = Omit<IUser, "password" | "role">;

export type CreateUser = Pick<IUser, "name" | "email" | "password">;

export type UpdateUserData = Partial<CreateUser>;
