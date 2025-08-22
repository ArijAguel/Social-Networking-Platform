import { Injectable } from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, EMPTY, Observable, tap} from "rxjs";
import {Request} from "../Models/Request";
import {Connection} from "../Models/Connection";

@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/connection`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  sendRequest(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/sendRequest/${encodeURIComponent(id)}`).pipe(
      catchError(err => {
        if (err.status !== 401) {
        this.toastr.error('', 'Failed to send request',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
        return EMPTY;
      })
    );
  }

  cancelRequest(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/cancelRequest/${encodeURIComponent(id)}`).pipe(
      catchError(err => {
        this.toastr.error('', 'Failed to send request',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      })
    );
  }

  removeConnection(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/removeConnection/${encodeURIComponent(id)}`).pipe(
      catchError(err => {
        this.toastr.error('', 'Failed to send request',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      })
    );
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/requests`).pipe(
      catchError(err => {
        this.toastr.error('', 'Failed to retrieve requests',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      })
    );
  }

  getConnections(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/connections`).pipe(
      catchError(err => {
        this.toastr.error('', 'Failed to retrieve requests',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      })
    );
  }

  acceptRequest(id: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/acceptRequest/${encodeURIComponent(id)}`).pipe(
      catchError(err => {
        this.toastr.error('', 'Failed to accept request',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      })
    );
  }

  declineRequest(id: number): Observable<Request[]> {
    return this.http.delete<Request[]>(`${this.apiUrl}/declineRequest/${encodeURIComponent(id)}`).pipe(
      catchError(err => {
        this.toastr.error('', 'Failed to decline request',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      })
    );
  }
}
