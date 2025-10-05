import { GenericRepository } from "../../shared/generic_repository";
import { prisma } from "../../services/prisma.service";
import { IUser } from "./user.entity";
import { usersData } from "./user.data";
import { ProfileUpdateData } from "./util/user.schema";

class UserRepository extends GenericRepository<IUser, typeof prisma.user> {
  constructor() {
    super(prisma.user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.model.findUnique({ where: { email } });
  }

  async updateProfile(
    id: string,
    data: ProfileUpdateData
  ): Promise<IUser | null> {
    return await this.update(id, data);
  }
}

export const userRepository = new UserRepository();
