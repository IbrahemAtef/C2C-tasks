import type { Response } from "express";
import { ModuleNameType } from "./constants";
import { ErrorStatusCode } from "./util.types";
import { Prisma } from "../../generated/prisma";

export class CustomError extends Error {
  public errorType = "custom";

  constructor(
    msg: string,
    public moduleName: ModuleNameType,
    public statusCode: ErrorStatusCode
  ) {
    super(msg);
  }
}

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    res.error({ message: error.message, statusCode: error.statusCode });
    return;
  }
  // TODO: try to trigger prisma error to see if it can catch it
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // console.log("prisma error message", error.message);
    res.error({ message: error.message, statusCode: 400 });
    return;
  }
  //   we should alert ourself
  res.error({
    message: `internal server error the error is: ${error}`,
    statusCode: 500,
  });
};
