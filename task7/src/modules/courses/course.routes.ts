import { Router } from "express";
import { courseController } from "./course.controller";
import { isAuthenticated } from "../../shared/middlewares/auth.middleware";
import { requireRole } from "../../shared/middlewares/role.middleware";

//? ASK: The admin can update , delete any course Or it's own course

const router = Router();

// GET /api/v1/courses/ - Get all courses
router.get("/", courseController.getAllCourses);

// GET /api/v1/courses/:id - Get course by id
router.get("/:id", courseController.getCourseById);

// POST /api/v1/courses/ - create new course
router.post(
  "/",
  isAuthenticated,
  requireRole(["ADMIN", "COACH"]),
  courseController.create
);

// put /api/v1/courses/:id - update course by id for creator
router.put(
  "/:id",
  isAuthenticated,
  requireRole(["ADMIN", "COACH"]),
  courseController.update
);

// delete /api/v1/courses/:id - delete course by id for creator
router.delete(
  "/:id",
  isAuthenticated,
  requireRole(["ADMIN", "COACH"]),
  courseController.delete
);

export const courseRouter = router;
