import { CustomError } from "../../shared/utils/exception";
import { newId } from "../../shared/utils/util";
import { HttpErrorStatus } from "../../shared/utils/util.types";
import { ICourse } from "./course.entity";
import { courseRepository } from "./course.repository";
import { CreateCourse, UpdateCourse } from "./types/course.dto";

class CourseService {
  async createCourse(data: CreateCourse, creatorId: string): Promise<ICourse> {
    const course: ICourse = {
      id: newId(),
      title: data.title,
      description: data.description,
      image: data.image,
      creatorId,
    };
    return await courseRepository.create(course);
  }

  async getAllCourses(): Promise<ICourse[]> {
    return await courseRepository.findAll();
  }

  async getCourseById(id: string): Promise<ICourse> {
    const course = await courseRepository.findById(id);
    if (!course)
      throw new CustomError(
        "Course not found",
        "COURSE",
        HttpErrorStatus.NotFound
      );
    return course;
  }

  async updateCourse(
    id: string,
    updaterId: string,
    data: UpdateCourse
  ): Promise<ICourse> {
    const course = await courseRepository.findById(id);

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

    const updated = await courseRepository.update(id, data);

    if (!updated)
      throw new CustomError(
        "Failed to update course",
        "COURSE",
        HttpErrorStatus.InternalServerError
      );

    return updated;
  }

  async deleteCourse(id: string, deleterId: string) {
    const course = await courseRepository.findById(id);

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

    const deleted = await courseRepository.delete(id);

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
