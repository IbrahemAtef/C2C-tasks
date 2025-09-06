import { Router } from "express";
import { courseController } from "./course.controller";
import { isAuthenticated } from "../../shared/middlewares/auth.middleware";
import { requireRole } from "../../shared/middlewares/role.middleware";

//? ASK: The admin can update , delete any course Or it's own course

const router = Router();

// GET /api/courses/ - Get all courses
router.get("/", courseController.getAllCourses);

// GET /api/courses/:id - Get course by id
router.get("/:id", courseController.getCourseById);

// POST /api/courses/ - create new course
router.post(
  "/",
  isAuthenticated,
  requireRole(["ADMIN", "COACH"]),
  courseController.create
);

// patch /api/courses/:id - update course by id for creator
router.patch(
  "/:id",
  isAuthenticated,
  requireRole(["ADMIN", "COACH"]),
  courseController.update
);

// delete /api/courses/:id - delete course by id for creator
router.delete(
  "/:id",
  isAuthenticated,
  requireRole(["ADMIN", "COACH"]),
  courseController.delete
);

export const courseRouter = router;
