import { Injectable } from '@angular/core';
import {ProgramParticipationApiService} from "../api/program-participation-api.service";

@Injectable({
  providedIn: 'root'
})
export class ProgramParticipationService {

  constructor(private participationService:ProgramParticipationApiService) { }
  getParticipations(){
    return this.participationService.getParticipationEntrepreneurs();
  }

  getProfessionalParticipations() {

    return this.participationService.getParticipationCoaches();
  }
}
