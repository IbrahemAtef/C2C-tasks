import { ICourse } from "../course.entity";

export type CreateCourseData = Omit<
  ICourse,
  "id" | "creatorId" | "createdAt" | "updatedAt"
>;
