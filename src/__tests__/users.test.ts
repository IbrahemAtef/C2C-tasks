import { Course, Enrollment, User } from "./../generated/prisma/index.d";
import { prisma } from "../services/prisma.service";
import { initTestAgents } from "./helpers/supertest.helper";

describe("User Module", () => {
  let unAuthedTestAgent: any;
  let authedTestUserAgent: any;
  let authedTestAdminAgent: any;
  let authedTestCoachAgent: any;
  let authedTestStudentAgent: any;
  let coach: any;
  let admin: any;

  let userData: User[];
  let courseData: Course[];
  let enrollmentData: Enrollment[];

  beforeAll(async () => {
    // save the db data
    userData = await prisma.user.findMany();
    courseData = await prisma.course.findMany();
    enrollmentData = await prisma.enrollment.findMany();

    // define agents
    const agents = await initTestAgents();
    unAuthedTestAgent = agents.unAuthedTestAgent;
    authedTestUserAgent = agents.authedTestUserAgent;
    authedTestAdminAgent = agents.authedTestAdminAgent;
    authedTestCoachAgent = agents.authedTestCoachAgent;
    authedTestStudentAgent = agents.authedTestStudentAgent;
    coach = agents.coach;
    admin = agents.admin;
  });
  //
  // 🔹 GET /api/v1/users/me
  //
  describe("GET /api/v1/users/me", () => {
    it("✅ Success: Authenticated any usser for ex. coach can fetch their own profile.", async () => {
      const res = await authedTestCoachAgent.get("/api/v1/users/me");

      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({
        id: coach.id,
        email: coach.email,
        name: coach.name,
      });
    });
    it("✅ Success: Authed admin agent will pass", async () => {
      const response = await authedTestAdminAgent.get("/api/v1/users/me");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: expect.objectContaining({
          email: admin.email,
          name: admin.name,
        }),
      });
    });
    it("❌ Unauthorized: Rejects request without authentication.", async () => {
      const response = await unAuthedTestAgent.get("/api/v1/users/me");
      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe("Missing Authorization header");
    });

    it("❌ Authed user agent with invalid token will throw error: Missing or invalid token", async () => {
      const response = await authedTestUserAgent.get("/api/v1/users/me");
      expect(response.status).toBe(401);
      expect(response.body.error.message).toBe(
        "Unauthorized: Missing or invalid token"
      );
    });
  });

  //
  // 🔹 POST /api/v1/users/coach
  //
  describe("POST /api/v1/users/coach", () => {
    it("✅ Success: ADMIN can create a new COACH user.", async () => {
      const payload = {
        email: `coach_${Date.now()}@example.com`,
        password: "password123",
        name: "Coach User",
      };
      const res = await authedTestAdminAgent
        .post("/api/v1/users/coach")
        .send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({
        email: payload.email,
        name: payload.name,
      });
    });

    it("❌ Forbidden: STUDENT cannot create a coach user.", async () => {
      const payload = {
        email: `coach_fail_${Date.now()}@example.com`,
        password: "password123",
        name: "Invalid Coach",
      };
      const res = await authedTestStudentAgent
        .post("/api/v1/users/coach")
        .send(payload);

      expect(res.status).toBe(403);
      expect(res.body.error.message).toBe("Forbidden: insufficient role");
    });

    it("❌ Validation Error: Missing fields returns 400.", async () => {
      const payload = { email: "" }; // invalid payload
      const res = await authedTestAdminAgent
        .post("/api/v1/users/coach")
        .send(payload);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain("Invalid input:");
    });

    it("❌ Authed Admin agent try to create a coach user that exist and throw an error: Email already in use", async () => {
      const existCoach = {
        name: coach.name,
        email: coach.email,
        password: "12345678",
      };
      const response = await authedTestAdminAgent
        .post("/api/v1/users/coach")
        .send(existCoach);
      expect(response.status).toBe(409);
      expect(response.body.error.message).toBe("Email already in use");
    });
  });

  //
  // 🔹 PATCH /api/v1/users/me
  //
  describe("PATCH /api/v1/users/me", () => {
    it("✅ Success: Authenticated user can update their profile.", async () => {
      let updatedStudentName = `Updated Student ${Date.now()}`;
      const res = await authedTestStudentAgent
        .patch("/api/v1/users/me")
        .send({ name: updatedStudentName });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe(updatedStudentName);
    });

    it("❌ Unauthorized: Rejects request without authentication.", async () => {
      const res = await unAuthedTestAgent
        .patch("/api/v1/users/me")
        .send({ name: "Hacker" });

      expect(res.status).toBe(401);
      expect(res.body.error.message).toBe("Missing Authorization header");
    });

    it("❌ Validation Error: Rejects invalid updates.", async () => {
      const res = await authedTestCoachAgent
        .patch("/api/v1/users/me")
        .send({ email: "not-an-email" });

      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain("Invalid ");
    });
  });

  afterAll(async () => {
    // Clean DB after tests
    await prisma.enrollment.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.user.deleteMany({});

    // Seed db data that saved before test
    await prisma.user.createMany({ data: userData });
    await prisma.course.createMany({ data: courseData });
    await prisma.enrollment.createMany({ data: enrollmentData });
    await prisma.$disconnect();
  });
});
