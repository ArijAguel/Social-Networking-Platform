import {QuestionLink} from "./QuestionLink";
import {User} from "./User";

export class Question {

  id = 0;
  question = "";
  type = "TEXT";
  required = false;
  responses: Response[] = [];
  nextLinkers: QuestionLink[] = [];
  choices: QuestionLink[] = []
  linked = false;
}

export class Response {

  id = 0;
  response = "";
  date = new Date();
  responses: string[] = [];
  user = new User();
}
