import { UserDto } from "./UserDTO";

export class Feed {
    constructor(
        public id: number,
        public user: UserDto,
        public idUser: number,
        public post: string,
        public image: string,
        public category: string,
        public creationDate: string, // Assuming Instant is converted to string
        public likes: number,
        public userLikes: UserDto[],
        public comments: any[],
        public sharedContent: string,
        public sharedById: number,
        public sharedBy: UserDto,
        public publisher: any,
        public publisherType: any,
    ) {}
}
