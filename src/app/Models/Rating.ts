import { User } from "./User";

export class Rating {
    constructor(
        public id: number,
        public idSender: number,
        public idUser: number,
        public rating: number,
        public comment: string,
        public sender: User,
        public user: User
    ) { }
}