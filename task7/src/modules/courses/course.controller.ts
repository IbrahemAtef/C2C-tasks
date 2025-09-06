// src/courses/course.controller.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../shared/utils/exception.js";
import { HttpErrorStatus } from "../../shared/utils/util.types.js";
import { courseService } from "./course.service.js";
import { zodValidation } from "../../shared/utils/zod.util.js";
import { CreateCourseData } from "./types/course.dto.js";
import {
  courseIdSchema,
  createCourseSchema,
  updateCourseSchema,
} from "./util/course.schema.js";

class CourseController {
  private _courseService = courseService;

  create(req: Request, res: Response, next: NextFunction) {
    const creatorId = req.user?.sub;

    if (!creatorId)
      throw new CustomError(
        "Unauthorized: Missing or invalid token",
        "COURSE",
        HttpErrorStatus.Unauthorized
      );

    const payloadData = zodValidation<CreateCourseData>(
      createCourseSchema,
      req.body,
      "COURSE"
    );

    const course = this._courseService.createCourse(payloadData, creatorId);

    res.create(course);
  }

  getAllCourses(req: Request, res: Response, next: NextFunction) {
    // TODO Later: pagination and limit when using DB
    const courses = this._courseService.getAllCourses();

    res.ok(courses);
  }

  getCourseById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = zodValidation(courseIdSchema, req.params, "COURSE");

    const course = this._courseService.getCourseById(id);

    res.ok(course);
  }

  async update(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const sub = req.user?.sub;

    if (!sub)
      throw new CustomError(
        "Unauthorized: Missing or invalid token",
        "COURSE",
        HttpErrorStatus.Unauthorized
      );

    const { id } = zodValidation(courseIdSchema, req.params, "COURSE");

    const payload = zodValidation(updateCourseSchema, req.body, "COURSE");

    const updated = this._courseService.updateCourse(id, sub, payload);

    res.ok(updated);
  }

  delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    const sub = req.user?.sub;

    if (!sub)
      throw new CustomError(
        "Unauthorized: Missing or invalid token",
        "COURSE",
        HttpErrorStatus.Unauthorized
      );

    const { id } = zodValidation(courseIdSchema, req.params, "COURSE");

    const result = this._courseService.deleteCourse(id, sub);

    res.delete(result);
  }
}

export const courseController = new CourseController();
