import { PrismaClient } from "../../src/generated/prisma";
import { usersData } from "../../src/modules/users/user.data";
import { Roles } from "../../src/modules/users/util/user.types";
import { newId } from "../../src/shared/utils/util";
import { createRandomCourse } from "../../src/seeds/course.seed";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting database seeding...");

  // 1️⃣ Clean up existing data (in dependency order)
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // 2️⃣ Insert users safely
  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log(`✅ Seeded ${usersData.length} users`);

  // 3️⃣ Find all coaches & admins
  const coachesAndAdmin = await prisma.user.findMany({
    where: { role: { in: [Roles.COACH, Roles.ADMIN] } },
  });

  // 4️⃣ Generate random courses for each coach or admin
  for (const coachOrAdmin of coachesAndAdmin) {
    const coursesToCreate = Array.from({
      length: faker.number.int({ min: 2, max: 5 }),
    }).map(() => ({
      ...createRandomCourse(coachOrAdmin.id),
    }));

    await prisma.course.createMany({ data: coursesToCreate });
    console.log(
      `📘 Created ${coursesToCreate.length} courses for ${coachOrAdmin.name}`
    );
  }

  // 5️⃣ Fetch all students & all courses
  const students = await prisma.user.findMany({
    where: { role: Roles.STUDENT },
  });
  const allCourses = await prisma.course.findMany();

  // 6️⃣ Randomly enroll each student into a subset of courses
  for (const student of students) {
    // Choose a random number of courses per student (e.g., 1–3)
    const numCourses = faker.number.int({
      min: 1,
      max: Math.min(3, allCourses.length),
    });
    const selectedCourses = faker.helpers.arrayElements(allCourses, numCourses);

    const enrollments = selectedCourses.map((course) => ({
      id: newId(),
      studentId: student.id,
      courseId: course.id,
    }));

    await prisma.enrollment.createMany({ data: enrollments });
    console.log(`🎓 ${student.name} enrolled in ${numCourses} course(s)`);
  }

  console.log("🌱 Database seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
