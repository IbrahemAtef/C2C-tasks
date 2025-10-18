import mongoose, { Document, FlatRecord } from "mongoose";
import { getEnvOrThrowError } from "../shared/utils/util";
import { removeFields } from "../shared/utils/object.util";
import { CustomError } from "../shared/utils/exception";
import { HttpErrorStatus } from "../shared/utils/util.types";

mongoose
  .connect(getEnvOrThrowError("MONGODB_URL"))
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    // console.log("MongoDB connection error: ", err);
    throw new CustomError(
      "Database connection failed with msg: " + err,
      "DATABASE",
      HttpErrorStatus.ServiceUnavailable
    );
  });

// ✅ Default toJSON behavior for all schemas
export const schemaToJsonDefaultOption = {
  virtuals: true,
  versionKey: false,
  transform: (_doc: Document, ret: FlatRecord<Record<string, unknown>>) => {
    // Add `id` field for convenience
    if (!ret.id && ret._id) ret.id = ret._id;

    // Remove unwanted fields
    return removeFields(ret, ["__v", "password", "_id"]);
  },
};

export const mongooseConnection = mongoose.connection;
