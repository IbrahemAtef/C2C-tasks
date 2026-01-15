import { app } from "../../../server";
import { usersData } from "../../modules/users/user.data";
import { singJWT } from "../../modules/auth/util/jwt.util";
import supertest from "supertest";
import { Roles } from "../../modules/users/util/user.types";

//1- get unauthed agent no token
export const unAuthedTestAgent = supertest.agent(app);

// 2- get authed agent with invalid token (expired or no id)
const userToken = singJWT({ sub: "", role: "STUDENT" });

export const authedTestUserAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${userToken}`);

//3- get authed agent as admin with token
export const admin = usersData[0]!;

const adminToken = singJWT({ sub: admin.id, role: Roles.ADMIN });

export const authedTestAdminAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${adminToken}`);

//4- get authed agent as user with token
export const student = usersData[1]!;

const studentToken = singJWT({ sub: student.id, role: Roles.STUDENT });

export const authedTestStudentAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${studentToken}`);

//5- get authed agent as coach with token
export const coach = usersData[2]!;

const coachToken = singJWT({ sub: coach.id, role: Roles.COACH });
export const authedTestCoachAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${coachToken}`);
