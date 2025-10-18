import { PUser } from "./user.entity";
import { createRandomUserOrCoach } from "../../seeds/user.seed";
import { Roles } from "./util/user.types";
import { newId, now } from "../../shared/utils/util";

export const randomUsers: PUser[] = Array.from({ length: 2 }, (_, i) => {
  const role = i % 2 === 0 ? Roles.STUDENT : Roles.COACH;
  return createRandomUserOrCoach(role);
});

const adminUser: PUser = {
  id: newId(),
  name: "Admin",
  email: "admin@no.com",
  password: "admin123",
  role: Roles.ADMIN,
  createdAt: now(),
  updatedAt: now(),
};

export const usersData: PUser[] = [adminUser, ...randomUsers];
