import { PrismaRepository } from "../../shared/prisma_repository";
import { prisma } from "../../services/prisma.service";
import { PUser } from "./user.entity";
import { ProfileUpdateData } from "./util/user.schema";
import { PUserPrismaRepositoryI } from "./interfaces/user_prisma_repo_interface";

class UserRepository
  extends PrismaRepository<PUser, typeof prisma.user>
  implements PUserPrismaRepositoryI
{
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string): Promise<PUser | null> {
    return await this.model.findUnique({ where: { email } });
  }

  async updateProfile(
    id: string,
    data: ProfileUpdateData
  ): Promise<PUser | null> {
    return await this.update(id, data);
  }
}

export const userRepository = new UserRepository();
