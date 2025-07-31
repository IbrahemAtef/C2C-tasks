import { BaseRepository } from "./base.repository";
import { IUser } from "./models";

const users: IUser[] = [
  { id: 1, name: "Salem", email: "salem@gmail.com", age: 15 },
  { id: 2, name: "Osama", email: "osama@gmail.com", age: 30 },
];

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(users);
  }
}
