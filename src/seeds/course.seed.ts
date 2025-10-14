import { faker } from "@faker-js/faker";
import { ICourse } from "../modules/courses/course.entity";

export function createRandomCourse(creatorId: string) {
  const randomCourse: ICourse = {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 3, max: 7 }),
    description: faker.lorem.paragraphs({ min: 1, max: 3 }),
    image: faker.image.urlLoremFlickr({ category: "education" }),
    creatorId,
  };
  return randomCourse;
}
