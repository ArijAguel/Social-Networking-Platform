import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, tap } from 'rxjs';
import { CONSTANTS } from '../config/constant';

@Injectable({
  providedIn: 'root'
})
export class ProgramApplicationApiService {

  private apiUrl = `${CONSTANTS.API_BASE_URL}/api/v1/organization/program/programApplication`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  addProjectToProgram(programApplication: any): any {
    return this.http.post<any>(`${this.apiUrl}/create`, programApplication).pipe(
      catchError((err) => {

        if (err.status !== 401) {
        this.toaster.error('An error occurred while applying for the program.', 'Error',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY;
      }),
      tap(() => this.toaster.success('Application submitted successfully.', 'Success',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }))
    );
  }

  findAllByProgram(idProgram: number): any {
    return this.http.get<any>(`${this.apiUrl}/program/${encodeURIComponent(idProgram)}`).pipe(
      catchError((err) => {
        this.toaster.error('An error occurred while fetching applications.', 'Error',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      })
    );
  }

  acceptApplication(id: number): any {
    return this.http.get<any>(`${this.apiUrl}/accept/${encodeURIComponent(id)}`).pipe(
      catchError((err) => {
        this.toaster.error('An error occurred while accepting the application.', 'Error',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),
      tap(() => this.toaster.success('Application accepted successfully.', 'Success',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }))
    );
  }

  declineApplication(id: number): any {
    return this.http.get<any>(`${this.apiUrl}/decline/${encodeURIComponent(id)}`).pipe(
      catchError((err) => {
        this.toaster.error('An error occurred while declining the application.', 'Error',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),
      tap(() => this.toaster.success('Application declined successfully.', 'Success',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }))
    );
  }
}
