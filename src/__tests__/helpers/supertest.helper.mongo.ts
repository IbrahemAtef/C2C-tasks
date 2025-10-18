import supertest from "supertest";
import { app } from "../../../server";
import { singJWT } from "../../modules/auth/util/jwt.util";
import { Roles } from "../../modules/users/util/user.types";
import { UserModel } from "../../modules/users/user.model";
import { CustomError } from "../../shared/utils/exception";
import { HttpErrorStatus } from "../../shared/utils/util.types";

/**
 * Initializes Supertest agents for different authentication states using MongoDB.
 * - unauthenticated
 * - invalid user token
 * - authenticated admin, student, and coach
 */
export async function initTestAgents() {
  // 1️⃣ Unauthenticated agent (no token)
  const unAuthedTestAgent = supertest.agent(app);

  // 2️⃣ Authenticated agent with invalid token (empty id)
  const invalidUserToken = singJWT({ sub: "", role: Roles.STUDENT });
  const authedTestUserAgent = supertest
    .agent(app)
    .set("Authorization", `Bearer ${invalidUserToken}`);

  // 3️⃣ Authenticated admin
  const admin = await UserModel.findOne({ role: Roles.ADMIN });
  if (!admin)
    throw new CustomError(
      "Admin user not found in DB",
      "DATABASE",
      HttpErrorStatus.NotFound
    );
  const adminToken = singJWT({ sub: admin._id.toString(), role: Roles.ADMIN });
  const authedTestAdminAgent = supertest
    .agent(app)
    .set("Authorization", `Bearer ${adminToken}`);

  // 4️⃣ Authenticated student
  const student = await UserModel.findOne({ role: Roles.STUDENT });
  if (!student)
    throw new CustomError(
      "Student user not found in DB",
      "DATABASE",
      HttpErrorStatus.NotFound
    );
  const studentToken = singJWT({
    sub: student._id.toString(),
    role: Roles.STUDENT,
  });
  const authedTestStudentAgent = supertest
    .agent(app)
    .set("Authorization", `Bearer ${studentToken}`);

  // 5️⃣ Authenticated coach
  const coach = await UserModel.findOne({ role: Roles.COACH });
  if (!coach)
    throw new CustomError(
      "Coach user not found in DB",
      "DATABASE",
      HttpErrorStatus.NotFound
    );
  const coachToken = singJWT({ sub: coach._id.toString(), role: Roles.COACH });
  const authedTestCoachAgent = supertest
    .agent(app)
    .set("Authorization", `Bearer ${coachToken}`);

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
