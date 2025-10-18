import { PUser } from "../../users/user.entity";

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = Omit<PUser, "password">;

export type LoginResponseDTOWithJWT = {
  data: Omit<PUser, "password" | "role">;
  token: string;
};

export type RegisterDTO = Pick<PUser, "email" | "name" | "password">;

export type RegisterResponseDTO = Omit<PUser, "password" | "role">;
