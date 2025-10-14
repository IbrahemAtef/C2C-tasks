import { GenericRepository } from "../../shared/generic_repository";
import { prisma } from "../../services/prisma.service";
import { ICourse } from "./course.entity";
import { coursesData } from "./course.data";

class CourseRepository extends GenericRepository<
  ICourse,
  typeof prisma.course
> {
  constructor() {
    super(prisma.course);
  }
}

export const courseRepository = new CourseRepository();
