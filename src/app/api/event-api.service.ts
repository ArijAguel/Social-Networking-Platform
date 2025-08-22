import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, of, forkJoin, switchMap } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../config/constant';
import { CloudinaryApiService } from './cloudinary-api.service';
import { FeedApiService } from './feed-api.service';

@Injectable({
  providedIn: 'root'
})
export class EventApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/event`;

  constructor(private toaster: ToastrService, private http: HttpClient, private cloudinaryService: CloudinaryApiService, private feedService: FeedApiService) { }

  findAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching event details!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  findPreviousEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/previous-events`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching event details!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }





  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${encodeURIComponent(id)} `)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching event details!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  addEvent(dto: any, image: File | null): any {

    const uploadImage$ = image
      ? this.cloudinaryService.upload(image)
      : of(null)

    return uploadImage$.pipe(switchMap((data) => {
      dto.image = data?.url ? data?.url : dto.image
      return this.http.post<any>(`${this.apiUrl}/add`, dto)
        .pipe(catchError((err) => {
          if(err.status !== 401){
          this.toaster.error('', 'An error occurred while adding the event!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
          return EMPTY;
        }));
      }));
  }



  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting the event!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  getEventByUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${encodeURIComponent(userId)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching event details!');
        return EMPTY;
      }));
  }



  updateEvent(eventId: number, dto: any, image: File | null): any {
    const uploadImage$ = image
      ? this.cloudinaryService.upload(image)
      : of(null)

    return uploadImage$.pipe(switchMap((data) => {
      dto.image = data?.url ? data?.url : dto.image

      return this.http.put<any>(`${this.apiUrl}/${encodeURIComponent(eventId)}/update`, dto)
        .pipe(catchError((err) => {

          if(err.status !== 401){
          this.toaster.error('', 'An error occurred while updating the event!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
          }
          return EMPTY;
        }))
    }))

  }



}
