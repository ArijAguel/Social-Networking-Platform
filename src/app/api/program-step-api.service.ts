import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {CONSTANTS} from "../config/constant";
import {catchError, EMPTY} from "rxjs";
import {ProgramStep} from "../Models/ProgramStep";
@Injectable({
  providedIn: 'root'
})
export class ProgramStepApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/organization/program/Step`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  createProgramStep(idProg: number, programStep: ProgramStep) {
    return this.http.post<ProgramStep>(`${this.apiUrl}/${encodeURIComponent(idProg)}`, programStep)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while creating program step!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  getProgramStepById(id: number) {
    return this.http.get<ProgramStep>(`${this.apiUrl}/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching program step by ID!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  getAllStepsByProgram(idProg: number) {
    return this.http.get<ProgramStep[]>(`${this.apiUrl}/byProgram/${encodeURIComponent(idProg)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching all program steps by program ID!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  updateProgramStep(id: number, programStep: ProgramStep) {
    return this.http.put<ProgramStep>(`${this.apiUrl}/${encodeURIComponent(id)}`, programStep)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while updating program step!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  deleteProgramStep(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting program step!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
}
