import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../config/constant';
import { Etape2 } from '../Models/Etape2/Etape2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Etape2ApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/etape2`;

  constructor(private toaster: ToastrService, private http: HttpClient,private router:Router) { }

  findAll(): Observable<Etape2[]> {
    return this.http.get<Etape2[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching Business environment data!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
  findByProjectId(id: number): Observable<Etape2> {
    return this.http.get<Etape2>(`${this.apiUrl}/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
      if (err.status === 403) {
        this.router.navigate(['/feed']);
        this.toaster.error('Access Denied', 'You do not have permission to access this resource.', {
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      } else {
        this.toaster.error('An error occurred', 'An error occurred while fetching Business Foundation by ID!', {
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
      return EMPTY;
    }));
  }

update(dto: Etape2): Observable<Etape2[]> {
  return this.http.post<Etape2[]>(`${this.apiUrl}/update`, dto)
    /*.pipe(catchError((err) => {
      this.toaster.error('', 'An error occurred while updating etape2 details!');
      return EMPTY;
    }));*/
}


delete(id: number) {
  return this.http.delete<Etape2[]>(`${CONSTANTS.API_BASE_URL}/delete/${encodeURIComponent(id)}`).pipe(catchError((err)=>{
      this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      return EMPTY
    }))
}
downloadPDF(id: number): Observable<Blob> {
    return this.http.get(`${CONSTANTS.API_BASE_URL}/etape2/download/pdf/${encodeURIComponent(id)}`, { responseType: 'blob' })
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite when downloading pdf!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  downloadWord(id: number): Observable<Blob> {
    return this.http.get(`${CONSTANTS.API_BASE_URL}/etape2/download/word/${encodeURIComponent(id)}`, { responseType: 'blob' })
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite when downloading word!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
}
