import {ProgramStepResponse} from "./ProgramStepResponse";

export class ProgramStep {
    id: number = 0;
    numStep: number = 0;
    predefinedStepName: string = '';
    programStepResponses: ProgramStepResponse[] = [];
}
