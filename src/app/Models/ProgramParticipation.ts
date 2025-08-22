import {Entrepreneur} from "./Entrepreneur";
import {OrganizationProgram} from "./OrganizationProgram";
import {Project} from "./Projet";
import {User} from "./User";
import {ProgramStepResponse} from "./ProgramStepResponse";

export class ProgramParticipation {
  id: number = 0;
  programParticipationcoaches: User[] = [];
  entrepreneur: Entrepreneur = new Entrepreneur();
  organizationProgram: OrganizationProgram = new OrganizationProgram();
  project: Project = new Project();

  projectName = '';
  organizationProgramName = '';
  organizationName = '';
  programStepResponses: ProgramStepResponse[] = [];
}
