import { UpdateQuery } from "mongoose";
import { MongooseRepository } from "../../shared/mongoose_repository";
import { MUserMongooseRepositoryI } from "./interfaces/user_mongoose_repo_interface";
import { ProfileUpdateData } from "./util/user.schema";
// //TODO: change user entity to mongoose schema
import { MUser } from "./user.entity";
import { UserDocument, UserModel } from "./user.model";

class UserMongooseRepository
  extends MongooseRepository<UserDocument>
  implements MUserMongooseRepositoryI
{
  constructor() {
    // 👇 this now infers the *exact* document type from the model
    super(UserModel);
  }

  /**
   * Find a user by email address.
   */
  async findByEmail(email: string): Promise<MUser | null> {
    const user = await this.model
      .findOne({ email })
      // .lean({ virtuals: true })
      .exec();
    return user ? this.mapToMUser(user) : null;
  }

  /**
   * Update user profile (name, avatar, bio, etc.)
   */
  async updateProfile(
    id: string,
    data: ProfileUpdateData
  ): Promise<MUser | null> {
    const updatedUser = await this.model
      .findByIdAndUpdate(id, data as UpdateQuery<MUser>, { new: true })
      // .lean({ virtuals: true })
      .exec();
    return updatedUser ? this.mapToMUser(updatedUser) : null;
  }

  /**
   * Increment or decrement post count inside a transaction session.
   */
  //   async incrementPostCount(
  //     id: string,
  //     action: "increment" | "decrement",
  //     session: ClientSession
  //   ): Promise<unknown> {
  //     const update = {
  //       $inc: { postCount: action === "increment" ? 1 : -1 },
  //     };

  //     const result = await this.userModel.updateOne({ _id: id }, update, {
  //       session,
  //     });
  //     return result;
  //   }

  //? Alternative version incrementPostCount
  //   async incrementPostCount(
  //     id: string,
  //     action: "increment" | "decrement",
  //     session?: ClientSession
  //   ): Promise<MUser> {
  //     const update = { $inc: { postCount: action === "increment" ? 1 : -1 } };
  //     const result = await this.userModel.findByIdAndUpdate(id, update, {
  //       new: true,
  //       session,
  //     });
  //     return result?.toObject() as MUser;
  //   }
  private mapToMUser(doc: any): MUser {
    return {
      id: doc._id,
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}

export const userMongoRepository = new UserMongooseRepository();
