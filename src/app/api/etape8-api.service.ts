import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Etape8 } from '../Models/Etape8/Etape8'; // Assuming you have a model named Etape3Dto
import { CONSTANTS } from '../config/constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Etape8ApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/etape8`;

  constructor(private toaster: ToastrService, private http: HttpClient,private router:Router) { }
 
  findAll(): Observable<Etape8[]> {
    return this.http.get<Etape8[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching Early Stage data!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
  findByProjectId(id: number): Observable<Etape8> {
    return this.http.get<Etape8>(`${this.apiUrl}/${encodeURIComponent(id)}`)
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

update(dto: Etape8): Observable<Etape8[]> {
  return this.http.post<Etape8[]>(`${this.apiUrl}/update`, dto)
    .pipe(catchError((err) => {
      this.toaster.error('', 'An error occurred while updating etape5Etape5 details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      return EMPTY;
    }));
}

delete(id: number) {
  return this.http.delete<Etape8[]>(`${CONSTANTS.API_BASE_URL}/delete/${encodeURIComponent(id)}`).pipe(catchError((err)=>{
      this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      return EMPTY
    }))
}
downloadPDF(id: number): Observable<Blob> {
    return this.http.get(`${CONSTANTS.API_BASE_URL}/etape8/download/pdf/${encodeURIComponent(id)}`, { responseType: 'blob' })
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite when downloading pdf!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  downloadWord(id: number): Observable<Blob> {
    return this.http.get(`${CONSTANTS.API_BASE_URL}/etape8/download/word/${encodeURIComponent(id)}`, { responseType: 'blob' })
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite when downloading word!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
}
