import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, of, forkJoin, switchMap, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../config/constant';
import { CloudinaryApiService } from './cloudinary-api.service';
import { FeedApiService } from "./feed-api.service";


@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/call`;

  constructor(
    private toaster: ToastrService,
    private feedService: FeedApiService,
    private http: HttpClient,
    private cloudinaryService: CloudinaryApiService
  ) { }

  findAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching call details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  findPreviousCalls() : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/previous-calls`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching call details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching call details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  addCall(dto: any, image: File | null): any {
    const uploadImage$ = image
      ? this.cloudinaryService.upload(image)
      : of(null);

    return uploadImage$.pipe(switchMap((data) => {
      dto.image = data?.url ? data?.url : dto.image;
      return this.http.post<any>(`${this.apiUrl}/add`, dto)
        .pipe(catchError((err) => {

            if(err.status !== 401){
          this.toaster.error('', 'An error occurred while adding the call!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
          return EMPTY;
        }
        ));
    })
    );
  }

  updateCall(dto: any, image: File | null): any {
    const uploadImage$ = image
      ? this.cloudinaryService.upload(image)
      : of(null);

    return uploadImage$.pipe(switchMap((data) => {
      dto.image = data?.url ? data?.url : dto.image;
      return this.http.post<any>(`${this.apiUrl}/update`, dto)
        .pipe(catchError((err) => {

          if(err.status !== 401){
          this.toaster.error('', 'An error occurred while updating the call!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
          return EMPTY;
        }));
    }));
  }

  deleteCall(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting the call!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  findAllByOrganizer(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/organizer`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching calls by organizer!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
}
