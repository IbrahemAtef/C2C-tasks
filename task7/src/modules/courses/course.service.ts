import { CustomError } from "../../shared/utils/exception";
import { newId, now } from "../../shared/utils/util";
import { HttpErrorStatus } from "../../shared/utils/util.types";
import { ICourse } from "./course.entity";
import { courseRepository } from "./course.repository";
import { CreateCourseData } from "./types/course.dto";

class CourseService {
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
    return courseRepository.create(course);
  }

  getAllCourses(): ICourse[] {
    return courseRepository.findAll();
  }

  getCourseById(id: string): ICourse {
    const course = courseRepository.findById(id);
    if (!course)
      throw new CustomError(
        "Course not found",
        "COURSE",
        HttpErrorStatus.NotFound
      );
    return course;
  }

  updateCourse(id: string, updaterId: string, data: Partial<ICourse>): ICourse {
    const course = courseRepository.findById(id);

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

    const updated = courseRepository.update(id, {
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
    const course = courseRepository.findById(id);

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

    const deleted = courseRepository.delete(id);

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
