import { unAuthedTestAgent } from "./supertest.helper";
//TODO: Not working
describe("user routes endpoints", () => {
  it("GET /api/v1/users with unAuthed agent will throw error", async () => {
    const response = await unAuthedTestAgent.get("/api/v1/users/me");
    expect(response.status).toBe(401);
  });
});
