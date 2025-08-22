import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {CONSTANTS} from "../config/constant";
import {catchError, EMPTY} from "rxjs";
import {ProgramParticipation} from "../Models/ProgramParticipation";

@Injectable({
  providedIn: 'root'
})
export class ProgramParticipationApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/program/participation`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  addProjectToProgram(idProgram: number, idProject: number) {
    return this.http.post<ProgramParticipation>(`${this.apiUrl}/${encodeURIComponent(idProgram)}/${encodeURIComponent(idProject)}`, null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while adding project to program!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  addCoachToProgram(idCoach: number, idProgram: number) {
    return this.http.put<ProgramParticipation>(`${this.apiUrl}/coach/${encodeURIComponent(idCoach)}/${encodeURIComponent(idProgram)}`, null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while adding coach to program participation!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  getParticipationEntrepreneurs() {
    return this.http.get<ProgramParticipation[]>(`${this.apiUrl}/entrepreneur`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching participation entrepreneurs!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  getParticipationCoaches() {
    return this.http.get<ProgramParticipation[]>(`${this.apiUrl}/coach`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching participation coaches!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  removeCoach(program: number, id: number) {
    return this.http.put<ProgramParticipation>(`${this.apiUrl}/coach/remove/${encodeURIComponent(id)}/${encodeURIComponent(program)}`, null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while removing coach to program participation!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
}
