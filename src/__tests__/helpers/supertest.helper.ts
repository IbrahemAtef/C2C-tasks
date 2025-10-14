import { app } from "../../../server";
import { singJWT } from "../../modules/auth/util/jwt.util";
import supertest from "supertest";
import { Roles } from "../../modules/users/util/user.types";
import { prisma } from "../../services/prisma.service";

export async function initTestAgents() {
  //1- get unauthed agent no token
  const unAuthedTestAgent = supertest.agent(app);
  // 2- get authed agent with invalid token (expired or no id)
  const userToken = singJWT({ sub: "", role: "STUDENT" });

  const authedTestUserAgent = supertest
    .agent(app)
    .set("AUTHORIZATION", `Bearer ${userToken}`);
  //3- get authed agent as admin with token
  const admin = await prisma.user.findFirstOrThrow({
    where: { role: Roles.ADMIN },
  });

  const adminToken = singJWT({ sub: admin.id, role: Roles.ADMIN });

  const authedTestAdminAgent = supertest
    .agent(app)
    .set("AUTHORIZATION", `Bearer ${adminToken}`);

  //4- get authed agent as user with token
  const student = await prisma.user.findFirstOrThrow({
    where: { role: Roles.STUDENT },
  });

  const studentToken = singJWT({ sub: student.id, role: Roles.STUDENT });

  const authedTestStudentAgent = supertest
    .agent(app)
    .set("AUTHORIZATION", `Bearer ${studentToken}`);

  //5- get authed agent as coach with token
  const coach = await prisma.user.findFirstOrThrow({
    where: { role: Roles.COACH },
  });

  const coachToken = singJWT({ sub: coach.id, role: Roles.COACH });
  const authedTestCoachAgent = supertest
    .agent(app)
    .set("AUTHORIZATION", `Bearer ${coachToken}`);

  return {
    unAuthedTestAgent,
    authedTestUserAgent,
    authedTestAdminAgent,
    authedTestStudentAgent,
    authedTestCoachAgent,
    coach,
    admin,
    student,
  };
}
