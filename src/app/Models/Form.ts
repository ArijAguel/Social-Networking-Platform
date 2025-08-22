import {Question} from "./Question";

export class Form {
  id: number = 0;
  title: string = "";
  description: string = "";
  code: string = "";
  createdAt: Date = new Date();
  published: boolean = true;
  submitted: boolean = true;
  question = new Question();
}
