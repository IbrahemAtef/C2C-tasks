// import { ClientSession } from "mongoose";
import { IGenericRepository } from "../../../shared/IGenericRepository";
import { MUser } from "../user.entity";
import { UserDocument } from "../user.model";
import { ProfileUpdateData } from "../util/user.schema";

export interface MUserMongooseRepositoryI
  extends IGenericRepository<UserDocument> {
  findByEmail(email: string): Promise<MUser | null>;
  updateProfile(id: string, data: ProfileUpdateData): Promise<MUser | null>;
  // TODO: implement this method later
  // incrementPostCount(
  //   id: string,
  //   action: "increment" | "decrement",
  //   session: ClientSession
  // ): Promise<unknown>;
}
