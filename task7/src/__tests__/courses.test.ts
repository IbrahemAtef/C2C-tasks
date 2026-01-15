import { ICourse } from "../modules/courses/course.entity";
import { createRandomCourse } from "../seeds/course.seed";
import { removeFields } from "../shared/utils/object.util";
import {
  admin,
  authedTestAdminAgent,
  authedTestCoachAgent,
  authedTestStudentAgent,
  coach,
  student,
  unAuthedTestAgent,
} from "./helpers/supertest.helper";

describe("Course Module", () => {
  //
  // 🔹 POST /api/v1/courses
  //
  describe("POST /api/v1/courses", () => {
    let createdCourseByCoachId: string;
    let createdCourseByAdminId: string;
    it("✅ Success: COACH or ADMIN can create a course with valid data.", async () => {
      // coach creates a course
      const newCourseSeedByCoach = createRandomCourse(coach.id);
      const response = await authedTestCoachAgent
        .post("/api/v1/courses")
        .send(newCourseSeedByCoach);
      createdCourseByCoachId = response.body.data.id;
      expect(response.status).toBe(201);
      expect(response.body.data).toMatchObject({
        title: newCourseSeedByCoach.title,
        description: newCourseSeedByCoach.description,
        creatorId: newCourseSeedByCoach.creatorId,
      });

      // admin creates a course
      const newCourseSeedByAdmin = createRandomCourse(admin.id);
      const res = await authedTestAdminAgent
        .post("/api/v1/courses")
        .send(newCourseSeedByAdmin);
      createdCourseByAdminId = res.body.data.id;
      expect(res.status).toBe(201);
      expect(res.body.data).toMatchObject({
        title: newCourseSeedByAdmin.title,
        description: newCourseSeedByAdmin.description,
        creatorId: newCourseSeedByAdmin.creatorId,
      });
    });

    it("❌ Forbidden: STUDENT cannot create a course.", async () => {
      const newCourseSeedByStudent = createRandomCourse(student.id);
      const res = await authedTestStudentAgent
        .post("/api/v1/courses")
        .send(newCourseSeedByStudent);
      expect(res.status).toBe(403);
      expect(res.body.error.message).toBe("Forbidden: insufficient role");
    });

    it("❌ Validation Error: Missing required fields returns 400.", async () => {
      const invalidCourse = removeFields(createRandomCourse(coach.id), [
        "title",
      ]);
      const res = await authedTestCoachAgent
        .post("/api/v1/courses")
        .send(invalidCourse);
      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain("Invalid input:");
    });

    afterAll(async () => {
      // reset course data after all POST route tests
      await authedTestCoachAgent.delete(
        `/api/v1/courses/${createdCourseByCoachId}`
      );
      await authedTestAdminAgent.delete(
        `/api/v1/courses/${createdCourseByAdminId}`
      );
    });
  });

  //
  // 🔹 GET /api/v1/courses
  //
  describe("GET /api/v1/courses", () => {
    it("❌ Edge: Returns an empty array when no courses exist.", async () => {
      const response = await unAuthedTestAgent.get("/api/v1/courses");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: [],
      });
    });

    describe("when courses exist", () => {
      beforeAll(async () => {
        await authedTestCoachAgent
          .post("/api/v1/courses")
          .send(createRandomCourse(coach.id));
        await authedTestAdminAgent
          .post("/api/v1/courses")
          .send(createRandomCourse(admin.id));
      });

      it("✅ Success: Returns a list of all courses (public).", async () => {
        const response = await unAuthedTestAgent.get("/api/v1/courses");
        expect(response.statusCode).toBe(200);
        const courseArr = response.body.data as ICourse[];
        expect(courseArr[0]).toMatchObject({
          title: expect.any(String),
          description: expect.any(String),
        });
      });
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
      expect(res.status).toBe(200);
      expect(res.body.data).toMatchObject({
        id: courseId,
        title: expect.any(String),
        description: expect.any(String),
        creatorId: coach.id,
      });
    });

    it("❌ Not Found: Returns 404 for invalid course ID.", async () => {
      const invalidId = "non-existent-id";
      const res = await unAuthedTestAgent.get(`/api/v1/courses/${invalidId}`);
      expect(res.status).toBe(404);
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
        .send({
          title: "Updated Coach Course",
          creatorId: "malicious-change", // try change creator Id
        });
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("Updated Coach Course");
      expect(res.body.data.creatorId).toBe(coach.id);
    });

    it("❌ Forbidden: STUDENT cannot update a course.", async () => {
      const res = await authedTestStudentAgent
        .put(`/api/v1/courses/${coachCourseId}`)
        .send({
          title: "Hack Attempt",
        });
      expect(res.status).toBe(403);
      expect(res.body.error.message).toBe("Forbidden: insufficient role");
    });

    it("❌ Not Owner: COACH cannot update a course created by another COACH/ADMIN.", async () => {
      const res = await authedTestCoachAgent
        .put(`/api/v1/courses/${adminCourseId}`)
        .send({
          title: "Illegal Update",
        });
      expect(res.status).toBe(403);
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
      expect(res.status).toBe(200);
      expect(res.body.data.message).toBe("Course deleted successfully");
    });

    it("❌ Forbidden: STUDENT cannot delete a course.", async () => {
      const res = await authedTestStudentAgent.delete(
        `/api/v1/courses/${coachCourseId}`
      );
      expect(res.status).toBe(403);
    });

    it("❌ Not Owner: COACH cannot delete a course created by another COACH/ADMIN.", async () => {
      const res = await authedTestCoachAgent.delete(
        `/api/v1/courses/${adminCourseId}`
      );
      expect(res.status).toBe(403);
    });
  });
});
