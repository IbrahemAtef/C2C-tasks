import { BaseRepository } from "./base.repository";
import { ICourse } from "./models";

const courses: ICourse[] = [
  { id: 1, title: "Java", description: "Intro to Java", hours: 20 },
  {
    id: 2,
    title: "Advanced python",
    description: "Deep python concepts",
    hours: 40,
  },
];

export class CourseRepository extends BaseRepository<ICourse> {
  constructor() {
    super(courses);
  }
}
