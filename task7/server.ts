import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { getEnvOrThrowError } from "./src/shared/utils/util";
import { userRouter } from "./src/modules/users/user.routes";
import { CustomError, handleError } from "./src/shared/utils/exception";
import { authRouter } from "./src/modules/auth/auth.routes";
import { courseRouter } from "./src/modules/courses/course.routes";
import { HttpErrorStatus } from "./src/shared/utils/util.types";
import { responseEnhancer } from "./src/shared/middlewares/response.middleware";

export const app = express();
const PORT = getEnvOrThrowError("PORT");

// Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(responseEnhancer);

// Routes
app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/courses", courseRouter);

// Fallback 404 middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    `Route ${req.originalUrl} not found`,
    "ROUTING",
    HttpErrorStatus.NotFound
  );
  next(error);
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log("App is running in port: " + PORT));
}
