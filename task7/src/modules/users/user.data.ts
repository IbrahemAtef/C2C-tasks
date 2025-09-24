import { faker } from "@faker-js/faker";
import { IUser } from "./user.entity";
import { createRandomUserOrCoach } from "../../seeds/user.seed";
import { Roles } from "./util/user.types";
import { newId, now } from "../../shared/utils/util";

export const randomUsers: IUser[] = faker.helpers.multiple(
  (_: unknown, __: number) =>
    createRandomUserOrCoach(
      faker.helpers.arrayElement([Roles.STUDENT, Roles.COACH])
    ),
  {
    count: 2,
  }
);

const adminUser: IUser = {
  id: newId(),
  name: "Admin",
  email: "admin@no.com",
  password: "admin123",
  role: "ADMIN",
  createdAt: now(),
  updatedAt: now(),
};

export const usersData: IUser[] = [adminUser, ...randomUsers];
