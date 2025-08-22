import { Injectable } from '@angular/core';
import {OrganizationApiService} from "../api/organization-api.service";
import {ProgramParticipation} from "../Models/ProgramParticipation";
import {ProgramParticipationApiService} from "../api/program-participation-api.service";
import {OrganizationService} from "./organization.service";
import {ProgramApplication} from "../Models/ProgramApplication";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private programParticipationApiService:ProgramParticipationApiService,private organizationApiService:OrganizationApiService) { }

  addProject(idProgram:number,idProject:number) {
   return  this.programParticipationApiService.addProjectToProgram(idProgram,idProject)
  }

  addCoach(program: number, id: number) {
    return  this.programParticipationApiService.addCoachToProgram(id,program)

  }

  getProgram(param: number) {
    return  this.organizationApiService.getProgramById(param);
  }
  getAllPrograms() {
    return  this.organizationApiService.getAllPrograms();
  }

  deleteParticipation(id: number) {
    return this.programParticipationApiService.delete(id);
  }

  apply(application: ProgramApplication) {
    return this.organizationApiService.apply(application);
  }

    declineApplication(id: number) {
        return this.organizationApiService.declineApplication(id);
    }

  acceptApplication(id: number) {
  return this.organizationApiService.acceptApplication(id);
  }

  removeCoach(program: number, id: number) {
    return this.programParticipationApiService.removeCoach(program,id);
  }
}
