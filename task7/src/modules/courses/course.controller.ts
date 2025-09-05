// src/courses/course.controller.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../shared/utils/exception.js";
import {
  HttpErrorStatus,
  StringObject,
} from "../../shared/utils/util.types.js";
import { courseService } from "./course.service.js";

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
    //TODO:  use zodValidation
    const course = this._courseService.createCourse(req.body, creatorId);
    res.create(course);
  }

  getAllCourses(req: Request, res: Response, next: NextFunction) {
    const courses = this._courseService.getAllCourses();
    res.ok(courses);
  }

  getCourseById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const course = this._courseService.getCourseById(req.params.id);
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
    const updated = this._courseService.updateCourse(
      req.params.id,
      sub,
      req.body
    );
    res.create(updated);
  }

  async delete(
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
    const result = this._courseService.deleteCourse(req.params.id, sub);
    res.delete(result);
  }
}

export const courseController = new CourseController();
