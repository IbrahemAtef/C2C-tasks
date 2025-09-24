import { z, ZodType } from "zod";
import { CreateCourseData } from "../types/course.dto";

export const createCourseSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  image: z.string().optional(),
  creatorId: z.string(),
}) satisfies ZodType<CreateCourseData>;

export const courseIdSchema = z.object({
  id: z.string(),
}) satisfies ZodType<{ id: string }>;
// Schema for updating a course (exclude creatorId)
export const updateCourseSchema = createCourseSchema
  .omit({ creatorId: true })
  .partial();

// Type for TypeScript inference
export type UpdateCourseData = z.infer<typeof updateCourseSchema>;
