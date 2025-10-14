import { z, ZodType } from "zod";
import { CreateCourse } from "../types/course.dto";
import { ICourse } from "../course.entity";

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  image: z.string().nullable(),
  creatorId: z.string(),
}) satisfies ZodType<ICourse>;

export const createCourseSchema = CourseSchema.pick({
  title: true,
  description: true,
  image: true,
}) satisfies ZodType<CreateCourse>;

export const courseIdSchema = CourseSchema.pick({
  id: true,
}) satisfies ZodType<{ id: string }>;
// Schema for updating a course (exclude creatorId)
export const updateCourseSchema = createCourseSchema.partial();

// Type for TypeScript inference
//?? export type UpdateCourseData = z.infer<typeof updateCourseSchema>;
