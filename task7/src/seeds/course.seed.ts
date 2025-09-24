import { faker } from "@faker-js/faker";
import { ICourse } from "../modules/courses/course.entity";

export function createRandomCourse(creatorId: string) {
  const randomCourse: Partial<ICourse> = {
    title: faker.lorem.words({ min: 3, max: 7 }),
    description: faker.lorem.paragraphs({ min: 1, max: 3 }),
    creatorId,
  };
  return randomCourse;
}
