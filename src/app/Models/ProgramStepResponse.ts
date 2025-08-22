import {ProgramParticipation} from "./ProgramParticipation";
import {ProgramStep} from "./ProgramStep";

export class ProgramStepResponse {
  id: number = 0;
  evaluation: number = 0;
  numStep: number = 0;
  name: string = '';
  status: string = '';
  description: string = '';
  startDate: Date | null = null;

  idUsers:number[]=[];
  idEntrepreneurs:number[]=[];
  idCoachs:number[]=[];
  endDate: Date | null = null;
  reportCoach: string = '';
  reportEntrepreneur: string = '';
  validationCoach: boolean = false;
  validationEntrepreneur: boolean = false;
  programParticipation: ProgramParticipation = new ProgramParticipation(); // Assuming ProgramParticipation class is defined
  programStep: ProgramStep = new ProgramStep(); // Assuming ProgramStep class is defined
}
