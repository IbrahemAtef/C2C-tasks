import { RequestHandler, Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// POST /api/v1/auth/register
router.post(
  "/register",
  authController.register.bind(authController) as RequestHandler
  // ?  authController.register.bind // ? ASK: why this wrong
);

// POST /api/v1/auth/login
router.post(
  "/login",
  authController.loginWithJWT.bind(authController) as RequestHandler
);

export const authRouter = router;
