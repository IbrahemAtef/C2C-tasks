import { Course, Enrollment, User } from "../generated/prisma";
import { prisma } from "../services/prisma.service";
import { createRandomCourse } from "../seeds/course.seed";
import { removeFields } from "../shared/utils/object.util";
import { initTestAgents } from "./helpers/supertest.helper";

describe("Course Module", () => {
  let unAuthedTestAgent: any;
  let authedTestAdminAgent: any;
  let authedTestCoachAgent: any;
  let authedTestStudentAgent: any;
  let coach: any;
  let admin: any;
  let student: any;

  let userData: User[];
  let courseData: Course[];
  let enrollmentData: Enrollment[];

  //
  // 🔹 SETUP
  //
  beforeAll(async () => {
    // Save initial DB state
    userData = await prisma.user.findMany();
    courseData = await prisma.course.findMany();
    enrollmentData = await prisma.enrollment.findMany();

    // Initialize test agents
    const agents = await initTestAgents();
    unAuthedTestAgent = agents.unAuthedTestAgent;
    authedTestAdminAgent = agents.authedTestAdminAgent;
    authedTestCoachAgent = agents.authedTestCoachAgent;
    authedTestStudentAgent = agents.authedTestStudentAgent;
    coach = agents.coach;
    admin = agents.admin;
    student = agents.student;
  });

  //
  // 🔹 POST /api/v1/courses
  //
  describe("POST /api/v1/courses", () => {
    it("✅ Success: COACH or ADMIN can create a course with valid data.", async () => {
      // coach creates a course
      const coachCourse = createRandomCourse(coach.id);
      const coachRes = await authedTestCoachAgent
        .post("/api/v1/courses")
        .send(coachCourse);
      expect(coachRes.statusCode).toBe(201);
      expect(coachRes.body.data).toMatchObject({
        title: coachCourse.title,
        description: coachCourse.description,
        creatorId: coach.id,
      });
      // admin creates a course
      const adminCourse = createRandomCourse(admin.id);
      const adminRes = await authedTestAdminAgent
        .post("/api/v1/courses")
        .send(adminCourse);
      expect(adminRes.statusCode).toBe(201);
      expect(adminRes.body.data).toMatchObject({
        title: adminCourse.title,
        description: adminCourse.description,
        creatorId: admin.id,
      });
    });

    it("❌ Forbidden: STUDENT cannot create a course.", async () => {
      const studentCourse = createRandomCourse(student.id);
      const res = await authedTestStudentAgent
        .post("/api/v1/courses")
        .send(studentCourse);
      expect(res.statusCode).toBe(403);
      expect(res.body.error.message).toBe("Forbidden: insufficient role");
    });

    it("❌ Validation Error: Missing required fields returns 400.", async () => {
      const invalidCourse = removeFields(createRandomCourse(coach.id), [
        "title",
      ]);
      const res = await authedTestCoachAgent
        .post("/api/v1/courses")
        .send(invalidCourse);
      expect(res.statusCode).toBe(400);
      expect(res.body.error.message).toContain("Invalid input:");
    });
  });

  //
  // 🔹 GET /api/v1/courses
  //
  describe("GET /api/v1/courses", () => {
    describe("Empty edge case", () => {
      let savedCourses: Course[] = [];

      beforeAll(async () => {
        // Save existing courses
        savedCourses = await prisma.course.findMany();

        // Delete all courses for the test
        await prisma.course.deleteMany();
      });

      it("❌ Edge: Returns an empty array when no courses exist.", async () => {
        const response = await unAuthedTestAgent.get("/api/v1/courses");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          success: true,
          data: [],
        });
      });

      afterAll(async () => {
        // Restore saved courses
        if (savedCourses.length > 0) {
          await prisma.course.createMany({
            data: savedCourses,
          });
        }
      });
    });

    it("✅ Success: Returns list of all courses (public).", async () => {
      const res = await unAuthedTestAgent.get("/api/v1/courses");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      if (res.body.data.length) {
        expect(res.body.data[0]).toMatchObject({
          title: expect.any(String),
          description: expect.any(String),
        });
      }
    });
  });

  //
  // 🔹 GET /api/v1/courses/:id
  //
  describe("GET /api/v1/courses/:id", () => {
    let courseId: string;

    beforeAll(async () => {
      const res = await authedTestCoachAgent
        .post("/api/v1/courses")
        .send(createRandomCourse(coach.id));
      courseId = res.body.data.id;
    });

    it("✅ Success: Returns course details when ID is valid.", async () => {
      const res = await unAuthedTestAgent.get(`/api/v1/courses/${courseId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toMatchObject({
        id: courseId,
        title: expect.any(String),
        description: expect.any(String),
        creatorId: coach.id,
      });
    });

    it("❌ Not Found: Returns 404 for invalid course ID.", async () => {
      const res = await unAuthedTestAgent.get(
        `/api/v1/courses/non-existent-id`
      );
      expect(res.statusCode).toBe(404);
      expect(res.body.error.message).toBe("Course not found");
    });
  });

  //
  // 🔹 PUT /api/v1/courses/:id
  //
  describe("PUT /api/v1/courses/:id", () => {
    let coachCourseId: string;
    let adminCourseId: string;

    beforeAll(async () => {
      const coachRes = await authedTestCoachAgent
        .post("/api/v1/courses")
        .send(createRandomCourse(coach.id));
      coachCourseId = coachRes.body.data.id;

      const adminRes = await authedTestAdminAgent
        .post("/api/v1/courses")
        .send(createRandomCourse(admin.id));
      adminCourseId = adminRes.body.data.id;
    });

    it("✅ Success: COACH can update their own course.", async () => {
      const res = await authedTestCoachAgent
        .put(`/api/v1/courses/${coachCourseId}`)
        .send({ title: "Updated Coach Course", creatorId: "malicious-change" }); // try change creator Id
      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe("Updated Coach Course");
      expect(res.body.data.creatorId).toBe(coach.id);
    });

    it("❌ Forbidden: STUDENT cannot update a course.", async () => {
      const res = await authedTestStudentAgent
        .put(`/api/v1/courses/${coachCourseId}`)
        .send({ title: "Hack Attempt" });
      expect(res.statusCode).toBe(403);
      expect(res.body.error.message).toBe("Forbidden: insufficient role");
    });

    it("❌ Not Owner: COACH cannot update another’s course.", async () => {
      const res = await authedTestCoachAgent
        .put(`/api/v1/courses/${adminCourseId}`)
        .send({ title: "Illegal Update" });
      expect(res.statusCode).toBe(403);
      expect(res.body.error.message).toBe("Forbidden: not course owner");
    });
  });

  //
  // 🔹 DELETE /api/v1/courses/:id
  //
  describe("DELETE /api/v1/courses/:id", () => {
    let coachCourseId: string;
    let adminCourseId: string;

    beforeAll(async () => {
      const coachRes = await authedTestCoachAgent
        .post("/api/v1/courses")
        .send(createRandomCourse(coach.id));
      coachCourseId = coachRes.body.data.id;

      const adminRes = await authedTestAdminAgent
        .post("/api/v1/courses")
        .send(createRandomCourse(admin.id));
      adminCourseId = adminRes.body.data.id;
    });

    it("✅ Success: COACH can delete their own course.", async () => {
      const res = await authedTestCoachAgent.delete(
        `/api/v1/courses/${coachCourseId}`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.data.message).toBe("Course deleted successfully");
    });

    it("❌ Forbidden: STUDENT cannot delete a course.", async () => {
      const res = await authedTestStudentAgent.delete(
        `/api/v1/courses/${coachCourseId}`
      );
      expect(res.statusCode).toBe(403);
    });

    it("❌ Not Owner: COACH cannot delete a course created by ADMIN.", async () => {
      const res = await authedTestCoachAgent.delete(
        `/api/v1/courses/${adminCourseId}`
      );
      expect(res.statusCode).toBe(403);
    });
  });

  //
  // 🔹 CLEANUP
  //
  afterAll(async () => {
    await prisma.enrollment.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.user.createMany({ data: userData });
    await prisma.course.createMany({ data: courseData });
    await prisma.enrollment.createMany({ data: enrollmentData });
    await prisma.$disconnect();
  });
});
