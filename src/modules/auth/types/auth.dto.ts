import { IUser } from "../../users/user.entity";

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = Omit<IUser, "password">;

export type LoginResponseDTOWithJWT = {
  data: Omit<IUser, "password" | "role">;
  token: string;
};

export type RegisterDTO = Pick<IUser, "email" | "name" | "password">;

export type RegisterResponseDTO = Omit<IUser, "password" | "role">;
