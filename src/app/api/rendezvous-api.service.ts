import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { RendezVous } from '../Models/Rendez-vous';
import { HttpClient } from '@angular/common/http';
import { CONSTANTS } from '../config/constant';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RendezvousApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/rendezvous`;

  constructor(private http:HttpClient , private toaster:ToastrService) { }

  findAll(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/user`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching feed details!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  findRendezVousById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching feed details!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  addRendezVous(rendezVous: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, rendezVous)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while adding a new rendezvous!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
}