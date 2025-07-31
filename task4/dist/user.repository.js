"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const base_repository_1 = require("./base.repository");
const users = [
    { id: 1, name: "Salem", email: "salem@gmail.com", age: 15 },
    { id: 2, name: "Osama", email: "osama@gmail.com", age: 30 },
];
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(users);
    }
}
exports.UserRepository = UserRepository;
