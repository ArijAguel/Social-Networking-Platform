import {Project} from "./Projet";
import {User} from "./User";

export class InterventionDemand {
  id = 0;
  idProject = 0;
  idCoach = 0;
  creationDate = new Date();
  project = new Project();
  interventionType = '';
  startDate = new Date();
  endDate = new Date();
  note = '';
  action: string = '';
  coach = new User();
}
