import { IUser } from "./user.entity";
import { createRandomUserOrCoach } from "../../seeds/user.seed";
import { Roles } from "./util/user.types";
import { newId, now } from "../../shared/utils/util";

export const randomUsers: IUser[] = Array.from({ length: 2 }, (_, i) => {
  const role = i % 2 === 0 ? Roles.STUDENT : Roles.COACH;
  return createRandomUserOrCoach(role);
});

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
