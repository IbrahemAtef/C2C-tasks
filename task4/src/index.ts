// test.ts
import { UserRepository } from "./user.repository";
import { CourseRepository } from "./course.repository";
import { BookingRepository } from "./booking.repository";

async function testRepositories() {
  const userRepo = new UserRepository();
  const courseRepo = new CourseRepository();
  const bookingRepo = new BookingRepository();
  console.log("\n=== Users ===");
  console.log(await userRepo.getAll());
  console.log("\n=== Create new User ===");
  console.log(
    await userRepo.create({
      id: 3,
      name: "Ahmed",
      email: "ahmed@mail.com",
      age: 20,
    })
  );
  console.log("\n=== Update User with id (1) ===");
  console.log(await userRepo.update(1, { name: "Hamada" }));
  console.log("\n=== Find User with email ===");
  console.log(await userRepo.find({ email: "osama@gmail.com" }));
  console.log("\n=== Delete User with id (2) ===");
  console.log(await userRepo.delete(2));
  console.log("\n=== All Users after deletion ===");
  console.log(await userRepo.getAll());

  console.log("\n=== Courses ===");
  console.log(await courseRepo.getAll());
  console.log("\n=== Find course with existing title ===");
  console.log(await courseRepo.find({ title: "Java" }));
  console.log("\n=== Find course with nonexisting title ===");
  console.log(await courseRepo.find({ title: "hello world" }));

  console.log("\n=== Bookings ===");
  console.log(await bookingRepo.getAll());
  console.log("\n=== Create new Booking ===");
  console.log(
    await bookingRepo.create({
      id: 3,
      userId: 3,
      courseId: 2,
      date: new Date("2025-08-10"),
    })
  );
  console.log("\n=== Find Booking by userId ===");
  console.log(await bookingRepo.find({ userId: 1 }));
}

testRepositories();
