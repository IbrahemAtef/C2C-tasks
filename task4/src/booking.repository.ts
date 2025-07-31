import { BaseRepository } from "./base.repository";
import { IBooking } from "./models";

const bookings: IBooking[] = [
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

export class BookingRepository extends BaseRepository<IBooking> {
  constructor() {
    super(bookings);
  }
}
