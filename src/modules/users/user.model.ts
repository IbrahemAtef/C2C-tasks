import mongoose, { Document, Model, Types } from "mongoose";
import { MUser } from "./user.entity";
import { schemaToJsonDefaultOption } from "../../services/mongoose.service";
import { Roles } from "./util/user.types";

export interface UserDocument
  extends MUser,
    Omit<Document<Types.ObjectId>, "id"> {}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // postCounts: { type: Number, default: 0 },
    password: {
      type: String,
      validate: {
        validator: function (passwordValue: string) {
          return passwordValue.length >= 6;
        },
        message: "Password should be at least 6 characters long",
      },
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      default: Roles.STUDENT,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: schemaToJsonDefaultOption,
    toObject: schemaToJsonDefaultOption,
  }
);
// Add `id` virtual
userSchema.virtual("id").get(function (this: UserDocument) {
  return this._id.toHexString();
});

export const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);
