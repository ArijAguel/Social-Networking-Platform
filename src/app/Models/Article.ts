import { Coach } from "./Coach";
import { UserDto } from "./UserDTO";

export class Article {
    constructor(
        public id: number,
        public titre: string,
        public categorie: string,
        public photos: string[],
        public description: string,
        public image: string,
        public creationDate: string ,// Assuming Instant is converted to string
        public publisherType:string,
        public publisherId:number,
        public publisher:Object,
        public likes: number,
        public userLikes: UserDto[],
        public comments: any[],
    ) {}
}