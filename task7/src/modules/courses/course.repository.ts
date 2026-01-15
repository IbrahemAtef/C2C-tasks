import { GenericRepository } from "../../shared/generic_repository";
import { coursesData } from "./course.data";
import { ICourse } from "./course.entity";

class CourseRepository extends GenericRepository<ICourse> {
  constructor() {
    super();
    for (const course of coursesData) {
      this.create(course);
    }
  }
}

export const courseRepository = new CourseRepository();
