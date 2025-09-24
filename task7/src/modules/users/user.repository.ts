import { GenericRepository } from "../../shared/generic_repository";
import { IUser } from "./user.entity";
import { usersData } from "./user.data";

class UserRepository extends GenericRepository<IUser> {
  constructor() {
    super();

    // Seed initial data into the repository
    for (const user of usersData) {
      this.create(user);
    }
  }

  // Example of a user-specific query
  findByEmail(email: string): IUser | undefined {
    return this.findByKey("email", email);
  }
}

export const userRepository = new UserRepository();
