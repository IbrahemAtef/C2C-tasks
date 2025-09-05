import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { getEnvOrThrowError } from "./src/shared/utils/util";
import { userRouter } from "./src/modules/users/user.routes";
import { handleError } from "./src/shared/utils/exception";
import { authRouter } from "./src/modules/auth/auth.routes";
import { courseRouter } from "./src/modules/courses/course.routes";

const app = express();
const PORT = getEnvOrThrowError("PORT");

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/courses", courseRouter);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

app.listen(PORT, () => console.log("App is running in port: " + PORT));
