import { ZodType } from "zod";
import { LoginDTO, RegisterDTO } from "../types/auth.dto";
import { userSchema } from "../../users/util/user.schema";

export const registerDTOSchema = userSchema.pick({
  email: true,
  name: true,
  password: true,
}) satisfies ZodType<RegisterDTO>;

export const loginDTOSchema = userSchema.pick({
  email: true,
  password: true,
}) satisfies ZodType<LoginDTO>;
