import { z, ZodType } from "zod";
import { CreateCourseData } from "../types/course.dto";

export const createCourseSchema = z.object({
  id: z.string(),
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  creatorId: z.string(),
}) satisfies ZodType<CreateCourseData>;

export const courseIdSchema = createCourseSchema.pick({
  id: true,
}) satisfies ZodType<{ id: string }>;

export const updateCourseSchema = createCourseSchema.partial();
