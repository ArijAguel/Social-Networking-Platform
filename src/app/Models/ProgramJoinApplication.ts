
import {Organization} from "./Organization";
import {OrganizationProgram} from "./OrganizationProgram";
import {User} from "./User";

export class ProgramJoinApplication {
  id: number = 0;
  idProgram: number = 0;
  idInvestisseur: number = 0;
  idOrganization: number = 0;
  creationDate: Date = new Date();
  organizationName: string = '';
  organizationProgram: OrganizationProgram = new OrganizationProgram();
  investisseur: User = new User();
  organization: Organization = new Organization();
  dates: Date[] = [];
  organizationNote: string = '';
  investisseurNote: string = '';
  action: string = '';
}
