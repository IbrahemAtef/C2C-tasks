import mongoose from "mongoose";
import { getEnvOrThrowError } from "../../src/shared/utils/util";
import { UserModel } from "../../src/modules/users/user.model";
import { usersData } from "../../src/modules/users/user.data";
// import { faker } from "@faker-js/faker";
// import { Roles } from "../../src/modules/users/util/user.types";

// Replace with your MongoDB connection string
const MONGO_URI = getEnvOrThrowError("MONGODB_URL");

async function main() {
  console.log("🚀 Starting MongoDB seeding...");

  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected to MongoDB");

  // 1️⃣ Clean up collections
  await Promise.all([
    // EnrollmentModel.deleteMany(),
    // CourseModel.deleteMany(),
    UserModel.deleteMany(),
  ]);
  console.log("🧹 Cleared existing collections");

  // 2️⃣ Insert users
  await UserModel.insertMany(usersData);
  console.log(`✅ Seeded ${usersData.length} users`);

  // 3️⃣ Find all coaches & admins
  //   const coachesAndAdmins = await UserModel.find({
  //     role: { $in: [Roles.COACH, Roles.ADMIN] },
  //   });

  // 4️⃣ Create random courses for each coach/admin
  //   const allCourses: any[] = [];
  //   for (const coachOrAdmin of coachesAndAdmins) {
  //     const numCourses = faker.number.int({ min: 2, max: 5 });
  //     const courses = Array.from({ length: numCourses }, () =>
  //       createRandomCourse(coachOrAdmin._id.toString())
  //     );
  //     allCourses.push(...courses);
  //     await CourseModel.insertMany(courses);
  //     console.log(`📘 Created ${numCourses} courses for ${coachOrAdmin.name}`);
  //   }

  // 5️⃣ Fetch all students
  //   const students = await UserModel.find({ role: Roles.STUDENT });

  // 6️⃣ Randomly enroll students
  //   for (const student of students) {
  //     const numCourses = faker.number.int({
  //       min: 1,
  //       max: Math.min(3, allCourses.length),
  //     });
  //     const selectedCourses = faker.helpers.arrayElements(allCourses, numCourses);

  //     const enrollments = selectedCourses.map((course) => ({
  //       _id: newId(),
  //       studentId: student._id,
  //       courseId: course._id,
  //     }));

  //     await EnrollmentModel.insertMany(enrollments);
  //     console.log(`🎓 ${student.name} enrolled in ${numCourses} course(s)`);
  //   }

  console.log("🌱 MongoDB seeding complete!");
  await mongoose.disconnect();
  process.exit(0);
}

main().catch(async (err) => {
  console.error("❌ Error during seeding:", err);
  await mongoose.disconnect();
  process.exit(1);
});
