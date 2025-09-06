import z, { ZodType } from "zod";
import { IUser } from "../user.entity";
import { Roles } from "./user.types";
import { CreateUser } from "../types/user.dto";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string().min(8),
  role: z.enum(Roles),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies ZodType<IUser>;

export const coachProfileSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
}) satisfies ZodType<CreateUser>;
