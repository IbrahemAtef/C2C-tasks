import { User } from "../../generated/prisma";
import { Role } from "./util/user.types";

export type PUser = User;

export type MUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
