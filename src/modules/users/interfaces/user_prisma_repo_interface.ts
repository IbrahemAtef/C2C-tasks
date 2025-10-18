import { IGenericRepository } from "../../../shared/IGenericRepository";
import { PUser } from "../user.entity";
import { ProfileUpdateData } from "../util/user.schema";

export interface PUserPrismaRepositoryI extends IGenericRepository<PUser> {
  findByEmail(email: string): Promise<PUser | null>;
  updateProfile(id: string, data: ProfileUpdateData): Promise<PUser | null>;
}
