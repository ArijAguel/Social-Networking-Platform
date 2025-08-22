import {User} from "./User";

export class Message {
  id: number = 0;
  senderName: string = '';
  receiverName: string = '';
  message: string = '';
  action: string = '';
  date: Date = new Date() ;
  seen: boolean = false;
  isSender: boolean = false;
  status: string = '';
  sender: User = new User(); // Assuming User class is defined
  receiver: User = new User(); // Assuming User class is defined

}
