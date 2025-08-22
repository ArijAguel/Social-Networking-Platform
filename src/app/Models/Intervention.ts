import {Project} from "./Projet";
import {User} from "./User";

export class Intervention{
  id = 0;
  idProject = 0;
  idCoach = 0;
  creationDate = new Date();
  project = new Project();
  interventionType = '';
  startDate = new Date();
  endDate = new Date();
  description = '';
  target: string = '';
  coach = new User();
}
