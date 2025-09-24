import {
  authedTestAdminAgent,
  authedTestCoachAgent,
  authedTestStudentAgent,
  authedTestUserAgent,
  unAuthedTestAgent,
} from "./helpers/supertest.helper";

//TODO: refactor test for all routes user
describe("user routes endpoints", () => {
  // Route GET /api/v1/users/me
  it("GET /api/v1/users/me with unAuthed agent will throw error: Missing Authorization header", async () => {
    const response = await unAuthedTestAgent.get("/api/v1/users/me");
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Missing Authorization header");
  });
  it("GET /api/v1/users/me with Authed user agent with invalid token will throw error: Missing or invalid token", async () => {
    const response = await authedTestUserAgent.get("/api/v1/users/me");
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe(
      "Unauthorized: Missing or invalid token"
    );
  });
  it("GET /api/v1/users/me with Authed admin agent will pass", async () => {
    const response = await authedTestAdminAgent.get("/api/v1/users/me");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        email: expect.stringMatching("admin@no.com"),
        name: expect.stringMatching("Admin"),
      }),
    });
  });
  it("GET /api/v1/users/me with Authed Coach and Student agents will pass", async () => {
    const responseCoach = await authedTestCoachAgent.get("/api/v1/users/me");
    const responseStudent = await authedTestStudentAgent.get(
      "/api/v1/users/me"
    );
    expect(responseCoach.status).toBe(200);
    expect(responseStudent.status).toBe(200);
    expect(responseCoach.body).toEqual({
      success: true,
      data: expect.objectContaining({
        email: expect.any(String),
        name: expect.any(String),
      }),
    });
  });

  // Route POST /api/v1/users/coach
  it("POST /api/v1/users/coach with unAuthed agent will throw an error: Missing Authorization header", async () => {
    const response = await unAuthedTestAgent.post("/api/v1/users/coach");
    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Missing Authorization header");
  });

  it("POST /api/v1/users/coach with Authed Student & coach agents will throw an error: insufficient role", async () => {
    const responseCoach = await authedTestCoachAgent.post(
      "/api/v1/users/coach"
    );
    expect(responseCoach.status).toBe(403);
    expect(responseCoach.body.error.message).toBe(
      "Forbidden: insufficient role"
    );
    const responseStudent = await authedTestStudentAgent.post(
      "/api/v1/users/coach"
    );
    expect(responseStudent.status).toBe(403);
    expect(responseStudent.body.error.message).toBe(
      "Forbidden: insufficient role"
    );
  });

  it("POST /api/v1/users/coach with Authed Admin agent will create a coach user and return his data", async () => {
    const newCoach = {
      name: "Ahmed",
      email: "Ahmed@gmail.com",
      password: "12345678",
    };
    const response = await authedTestAdminAgent
      .post("/api/v1/users/coach")
      .send(newCoach);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        email: newCoach.email,
        name: newCoach.name,
      }),
    });
  });

  it("POST /api/v1/users/coach with Authed Admin agent will create a coach user that exist and throw an error: Email already in use", async () => {
    const newCoach = {
      name: "Ahmed",
      email: "Ahmed@gmail.com",
      password: "12345678",
    };
    const response = await authedTestAdminAgent
      .post("/api/v1/users/coach")
      .send(newCoach);
    expect(response.status).toBe(409);
    expect(response.body.error.message).toBe("Email already in use");
  });
});
