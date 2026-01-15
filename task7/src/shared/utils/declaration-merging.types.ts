import { JWT_PAYLOAD } from "../../modules/auth/util/jwt.util";
import { UnifiedApiErrorResponse } from "../middlewares/response.middleware";

export type MyEnvs = {
  PORT: number;
  NODE_ENV: "development" | "production" | "test";
  JWT_SECRET: "secret";
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
  namespace Express {
    interface Response {
      create: (data: object) => this;
      ok: (data: object) => this;
      delete: (date: object) => this;
      error: (err: UnifiedApiErrorResponse) => this;
    }
    interface Request {
      user?: JWT_PAYLOAD;
    }
  }
}
