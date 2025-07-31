"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
const base_repository_1 = require("./base.repository");
const courses = [
    { id: 1, title: "Java", description: "Intro to Java", hours: 20 },
    {
        id: 2,
        title: "Advanced python",
        description: "Deep python concepts",
        hours: 40,
    },
];
class CourseRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(courses);
    }
}
exports.CourseRepository = CourseRepository;
