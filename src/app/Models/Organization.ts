import {User} from "./User";
import {OrganizationProgram} from "./OrganizationProgram";

export class Organization {
  id =0;
  idAdmin =0;
  idUsers: number[]=[];
  name = '';
  type = '';
  address = '';
  logo = '';
  cover = '';
  phoneNumber = '';
  privateOrganization =false;
  mail = '';
  website = '';
  dateOfConstitution: Date | null = null;
  sectors:string[]= []
  instagram: string = "";
  linkedinLink: string = "";
  facebook: string = "";
  twitter: string = "";
  users:User[] = []
  coachs:User[] = []
  ssos:User[] = []
  investors:User[] = []
  organizationProgram:OrganizationProgram[] = []
}
