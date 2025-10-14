import { Router } from "express";
import { UserController } from "./user.controller";
import { isAuthenticated } from "../../shared/middlewares/auth.middleware";
import { requireRole } from "../../shared/middlewares/role.middleware";

const router = Router();

const userController = new UserController();

// GET /api/v1/users/me - Get my profile
router.get("/me", isAuthenticated, userController.getUserProfile);

// POST /api/v1/users/coach - Create coach user
router.post(
  "/coach",
  isAuthenticated,
  requireRole(["ADMIN"]),
  userController.createCoach
);

// PATCH /api/v1/users/me - Update user
router.patch("/me", isAuthenticated, userController.updateUserProfile);

export const userRouter = router;
