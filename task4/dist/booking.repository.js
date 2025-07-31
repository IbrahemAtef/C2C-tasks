"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRepository = void 0;
const base_repository_1 = require("./base.repository");
const bookings = [
    {
        id: 1,
        userId: 1,
        courseId: 1,
        date: new Date("2025-07-01"),
    },
    {
        id: 2,
        userId: 2,
        courseId: 2,
        date: new Date("2025-07-15"),
    },
];
class BookingRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(bookings);
    }
}
exports.BookingRepository = BookingRepository;
