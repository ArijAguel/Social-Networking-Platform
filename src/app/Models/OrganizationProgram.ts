import {ProgramStep} from "./ProgramStep";
import {ProgramParticipation} from "./ProgramParticipation";
import {Organization} from "./Organization";
import {ProgramApplication} from "./ProgramApplication";

export class OrganizationProgram{
  id: number= 0;
  participants: number = 0;

  name='';
  description='';
  predefined=true;
  publicProgram = false;
  nbOfSteps=0;
  targetAudience='';
  programBenefits='';
   expectedResults='';
  startDate: Date | null = null;
  endDate: Date | null = null;
  howToApply=''
  organization = new Organization();
  programSteps:ProgramStep[]=[];
  participations:ProgramParticipation[]=[];
  applications:ProgramApplication[]=[];
}
