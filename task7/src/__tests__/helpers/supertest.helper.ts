import { app } from "../../../server";
import { usersData } from "../../modules/users/user.data";
import supertest from "supertest";
import { singJWT } from "../../modules/auth/util/jwt.util";

//1- get unauthed agent no token
export const unAuthedTestAgent = supertest.agent(app);

//2- get authed agent as admin with token
const admin = usersData[0]!;

const adminToken = singJWT({ sub: admin.id, role: "ADMIN" });

export const authedTestAdminAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${adminToken}`);

//3- get authed agent as user with token
const user = usersData[1]!;

const userToken = singJWT({ sub: user.id, role: "STUDENT" });

export const authedTestUserAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${userToken}`);

//4- get authed agent as coach with token
const coach = usersData[2]!;

const coachToken = singJWT({ sub: coach.id, role: "COACH" });
export const authedTestCoachAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${coachToken}`);
