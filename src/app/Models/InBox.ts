import {User} from "./User";

export class InBox {
  chats: Chat[] = [];
}

export class Chat {
  id: number = 0;
  users: User[] = [];
  newMessage: string = '';
  unread: boolean = false;
}
