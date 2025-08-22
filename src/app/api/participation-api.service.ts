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
export class ParticipationApiService {
    private apiUrl = `${CONSTANTS.API_BASE_URL}/participation`;

    constructor(private toaster: ToastrService, private http: HttpClient, private cloudinaryService: CloudinaryApiService) { }


    findAll(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/all`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching participation details!');
                return EMPTY;
            }));
    }

    findById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${encodeURIComponent(id)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching participation details!');
                return EMPTY;
            }));
    }

    findByType(type: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/type/${encodeURIComponent(type)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching participation details!');
                return EMPTY;
            }));
    }

    findByUserId(userId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user/${encodeURIComponent(userId)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching participation details!');
                return EMPTY;
            }));
    }

    findByTypeId(typeId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/type/${encodeURIComponent(typeId)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching participation details!');
                return EMPTY;
            }));
    }

    findByTypeAndTypeId(type: string, typeId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/type/${encodeURIComponent(type)}/${encodeURIComponent(typeId)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while fetching participation details!');
                return EMPTY;
            }));
    }

    addParticipation(userId: number, participation: any): any {
        return this.http.post<any>(`${this.apiUrl}/add/${encodeURIComponent(userId)}`, participation)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while adding the participation!');
                return EMPTY;
            }));
    }

    deleteParticipation(type :any , userId: number, eventId: number): any {
        return this.http.delete<any>(`${this.apiUrl}/delete/${encodeURIComponent(type)}/user/${encodeURIComponent(userId)}/event/${encodeURIComponent(eventId)}`)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while deleting the participation!');
                return EMPTY;
            }));
    }

    updateParticipation(id: number, participation: any): any {
        return this.http.put<any>(`${this.apiUrl}/update/${encodeURIComponent(id)}`, participation)
            .pipe(catchError((err) => {
                this.toaster.error('', 'An error occurred while updating the participation!');
                return EMPTY;
            }));
    }

}

 