import { faker } from "@faker-js/faker";
import { IUser } from "../modules/users/user.entity";
import { Role } from "../modules/users/util/user.types";

export function createRandomUserOrCoach(role: Role) {
  const randomUser: IUser = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    role,
  };
  return randomUser;
}
