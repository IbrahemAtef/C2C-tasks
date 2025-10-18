import z, { ZodType } from "zod";
import { PUser } from "../user.entity";
import { Roles } from "./user.types";
import { CreateUser } from "../types/user.dto";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(Roles),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies ZodType<PUser>;

export const coachProfileSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
}) satisfies ZodType<CreateUser>;

export const profileUpdateSchema = userSchema
  .pick({
    name: true,
    email: true,
    password: true,
  })
  .partial();

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;
