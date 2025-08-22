import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../config/constant';
import { Remarque } from '../Models/Remarque';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemarqueApiService {

  private apiUrl = `${CONSTANTS.API_BASE_URL}/remarque`;

  constructor(private http:HttpClient , private toaster:ToastrService) { }

  create(remarque:Remarque): Observable<Remarque> {
    return this.http.post<Remarque>(`${this.apiUrl}/create`,remarque)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while creating the remarque',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),tap(() => {
      this.toaster.success('', 'Remark added successfully!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }));
  }
  update(remarque:Remarque):Observable<Remarque> {
    return this.http.post<Remarque>(`${this.apiUrl}/update`,remarque)
    .pipe(catchError((err) => {
      this.toaster.error('', 'An error occurred while updating the remarque',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      return EMPTY;
    }),tap(() => {
      this.toaster.success('', 'Remark updated successfully!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }));
  }
  delete(id:number) {
    return this.http.delete<void>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
    .pipe(catchError((err) => {
      this.toaster.error('', 'An error occurred while deleting the remark',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      return EMPTY;
    }),tap(() => {
      this.toaster.success('', 'Remark deleted successfully!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }));
  } 
}
