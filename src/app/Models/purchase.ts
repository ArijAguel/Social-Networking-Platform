import {Pack} from "./Pack";
import {User} from "./User";

export class Purchase {
  id: number = 0;
  price: number = 0;
  status: string = '';
  date: Date = new Date();
  endDate: Date = new Date();
  pack:Pack = new Pack();
  user: User = new User();
}
