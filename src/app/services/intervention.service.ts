import { Injectable } from '@angular/core';
import { InterventionApiService } from '../api/intervention-api.service';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private interventionService : InterventionApiService) { }

  getInterventionDemands(){
    return this.interventionService.getInterventionDemands();
  }

  apply(interventionDemand: any){
    return this.interventionService.apply(interventionDemand);
  }

  updateInterventionDemand(interventionDemand: any){
    return this.interventionService.updateInterventionDemand(interventionDemand);
  }

  deleteInterventionDemand(id: number){
    return this.interventionService.deleteInterventionDemand(id);
  }

  
}
