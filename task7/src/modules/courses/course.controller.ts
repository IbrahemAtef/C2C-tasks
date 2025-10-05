// src/courses/course.controller.ts
import { Request, Response, NextFunction } from "express";
import { CreateCourse, UpdateCourse } from "./types/course.dto";
import { courseService } from "./course.service";
import { zodValidation } from "../../shared/utils/zod.util";
import {
  courseIdSchema,
  createCourseSchema,
  updateCourseSchema,
} from "./util/course.schema";

class CourseController {
  async create(req: Request, res: Response, next: NextFunction) {
    const creatorId = req.user!.sub;

    const payloadData = zodValidation<CreateCourse>(
      createCourseSchema,
      req.body,
      "COURSE"
    );

    const course = await courseService.createCourse(payloadData, creatorId);

    res.create(course);
  }

  async getAllCourses(req: Request, res: Response, next: NextFunction) {
    // TODO Later: pagination and limit when using DB
    const courses = await courseService.getAllCourses();

    res.ok(courses);
  }

  async getCourseById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = zodValidation(courseIdSchema, req.params, "COURSE");

    const course = await courseService.getCourseById(id);

    res.ok(course);
  }

  async update(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const sub = req.user!.sub;

    const { id } = zodValidation(courseIdSchema, req.params, "COURSE");

    const payload = zodValidation<UpdateCourse>(
      updateCourseSchema,
      req.body,
      "COURSE"
    );

    const updated = await courseService.updateCourse(id, sub, payload);

    res.ok(updated);
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const sub = req.user!.sub;

    const { id } = zodValidation(courseIdSchema, req.params, "COURSE");

    const result = await courseService.deleteCourse(id, sub);

    res.delete(result);
  }
}

export const courseController = new CourseController();
