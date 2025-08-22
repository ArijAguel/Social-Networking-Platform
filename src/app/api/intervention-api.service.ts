import { Injectable } from '@angular/core';
import { CONSTANTS } from '../config/constant';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {catchError, EMPTY, tap} from "rxjs";
import {Intervention} from "../Models/Intervention";

@Injectable({
  providedIn: 'root'
})
export class InterventionApiService {

  private apiUrl = `${CONSTANTS.API_BASE_URL}/professional-dashboard`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  getInterventionDemands(): any {
    return this.http.get<any>(`${this.apiUrl}/intervention-demands`)
  }

  apply(interventionDemand: any): any {
    return this.http.post<any>(`${this.apiUrl}/intervention-demands/apply`, interventionDemand).pipe( catchError((err)=>{
      this.toaster.info('', 'Your application was already sent!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      return EMPTY
    }),tap(() => this.toaster.success('', 'Your application was sent!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }

  updateInterventionDemand(interventionDemand: any): any {
    return this.http.post<any>(`${this.apiUrl}/intervention-demands/update`, interventionDemand)
  }

  deleteInterventionDemand(id: number): any {
    return this.http.delete<any>(`${this.apiUrl}/intervention-demands/delete/${encodeURIComponent(id)}`)
  }


  getInterventions(): any {
    return this.http.get<Intervention[]>(`${this.apiUrl}/interventions`)
  }

  updateIntervention(intervention: any): any {
    return this.http.post<any>(`${this.apiUrl}/interventions/update`, intervention)
  }

  deleteIntervention(id: number): any {
    return this.http.delete<Intervention[]>(`${this.apiUrl}/interventions/delete/${encodeURIComponent(id)}`)
  }




}
