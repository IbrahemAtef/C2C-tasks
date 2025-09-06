import { GenericRepository } from "../../shared/generic_repository";
import { CustomError } from "../../shared/utils/exception";
import { newId, now } from "../../shared/utils/util";
import { HttpErrorStatus } from "../../shared/utils/util.types";
import { ICourse } from "./course.entity";
import { CreateCourseData } from "./types/course.dto";

class CourseService {
  private repository = new GenericRepository<ICourse>();

  createCourse(data: CreateCourseData, creatorId: string) {
    const course: ICourse = {
      id: newId(),
      title: data.title,
      description: data.description,
      image: data.image,
      creatorId,
      createdAt: now(),
      updatedAt: now(),
    };
    return this.repository.create(course);
  }

  getAllCourses(): ICourse[] {
    return this.repository.findAll();
  }

  getCourseById(id: string): ICourse {
    const course = this.repository.findById(id);
    if (!course)
      throw new CustomError(
        "Course not found",
        "COURSE",
        HttpErrorStatus.NotFound
      );
    return course;
  }

  updateCourse(id: string, updaterId: string, data: Partial<ICourse>): ICourse {
    const course = this.repository.findById(id);

    if (!course)
      throw new CustomError(
        "Course not found",
        "COURSE",
        HttpErrorStatus.NotFound
      );

    if (course.creatorId !== updaterId) {
      throw new CustomError(
        "Forbidden: not course owner",
        "COURSE",
        HttpErrorStatus.Forbidden
      );
    }

    const updated = this.repository.update(id, {
      ...data,
      updatedAt: now(),
    });

    if (!updated)
      throw new CustomError(
        "Failed to update course",
        "COURSE",
        HttpErrorStatus.InternalServerError
      );

    return updated;
  }

  deleteCourse(id: string, deleterId: string) {
    const course = this.repository.findById(id);

    if (!course)
      throw new CustomError(
        "Course not found",
        "COURSE",
        HttpErrorStatus.NotFound
      );

    if (course.creatorId !== deleterId) {
      throw new CustomError(
        "Forbidden: not course owner",
        "COURSE",
        HttpErrorStatus.Forbidden
      );
    }

    const deleted = this.repository.delete(id);

    if (!deleted)
      throw new CustomError(
        "Failed to delete course",
        "COURSE",
        HttpErrorStatus.InternalServerError
      );

    return { message: "Course deleted successfully" };
  }
}

export const courseService = new CourseService();
