import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {CONSTANTS} from "../config/constant";
import {catchError, EMPTY} from "rxjs";
import {ProgramParticipation} from "../Models/ProgramParticipation";
import {ProgramStepResponse} from "../Models/ProgramStepResponse";

@Injectable({
  providedIn: 'root'
})
export class ProgramStepResponseApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/program/participation/Response`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  findAllParticipations() {
    return this.http.get<ProgramParticipation[]>(`${this.apiUrl}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching program participations!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  addCustomStep(id:number) {
    return this.http.post<ProgramParticipation>(`${this.apiUrl}/custom/${encodeURIComponent(id)}`, {part:''})
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching program participations!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  findAllResponsesByParticipation(idParticipation: number) {
    return this.http.get<ProgramStepResponse[]>(`${this.apiUrl}/${encodeURIComponent(idParticipation)}`)
      .pipe(catchError((err) => {
        this.toaster.error(err.error.message, err.error.errors[0], {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  update(id: number,response: ProgramStepResponse) {
    return this.http.put<ProgramStepResponse>(`${this.apiUrl}/update/${encodeURIComponent(id)}`,response)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching program step responses by participation!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  deleteReponse(id: number) {
    return this.http.delete<ProgramStepResponse>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching program step responses by participation!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  exitProgram(queryParam: number) {
    return this.http.get<void>(`${this.apiUrl}/leaveProgram/${encodeURIComponent(queryParam)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching program step responses by participation!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
}
