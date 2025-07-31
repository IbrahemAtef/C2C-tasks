export interface IDbEntity {
  id: number;
}
export interface IUser extends IDbEntity {
  name: string;
  email: string;
  age: number;
}

export interface ICourse extends IDbEntity {
  title: string;
  description: string;
  hours: number;
}

export interface IBooking extends IDbEntity {
  userId: number;
  courseId: number;
  date: Date;
}
