import {Injectable} from '@angular/core';
import {ProgramStepResponseApiService} from "../api/program-step-response-api.service";
import {ProgramStepResponse} from "../Models/ProgramStepResponse";

@Injectable({
  providedIn: 'root'
})
export class ProgramStepResponseService {

  constructor(private programStepResponseApiService:ProgramStepResponseApiService) { }
  getProgramStepResponse(id:number){
    return this.programStepResponseApiService.findAllResponsesByParticipation(id);
  }
  update(id:number,response:ProgramStepResponse){
    return this.programStepResponseApiService.update(id,response);
  }
  addCustomStep(id:number){
    return this.programStepResponseApiService.addCustomStep(id);
  }

  deleteReponse(id: number) {
    return this.programStepResponseApiService.deleteReponse(id);
  }

  exitProgram(queryParam: number) {
    return this.programStepResponseApiService.exitProgram(queryParam);
  }
}
