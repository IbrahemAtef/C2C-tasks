import { ICourse } from "../course.entity";

export type CreateCourse = Omit<
  ICourse,
  "id" | "creatorId" | "createdAt" | "updatedAt"
>;

export type UpdateCourse = Partial<CreateCourse>;
