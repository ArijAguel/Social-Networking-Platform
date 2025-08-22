import { Injectable } from "@angular/core";
import { CONSTANTS } from "../config/constant";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { EMPTY, catchError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RatingApiService {
    private apiUrl = `${CONSTANTS.API_BASE_URL}/rating`;

    constructor(private toaster: ToastrService, private http: HttpClient) { }

    findAll() {
        return this.http.get(`${this.apiUrl}/all`)
            .pipe(catchError((err) => {
              if(err.status !== 401){
                this.toaster.error('', 'An error occurred while fetching ratings!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
                return EMPTY;
            }));
    }

    addRating(rating: any) {
        return this.http.post(`${this.apiUrl}/add`, rating)
            .pipe(catchError((err) => {

              if(err.status !== 401){
                this.toaster.error('', 'An error occurred while adding a new rating!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
                return EMPTY;
            }));
    }

    deleteRating(id: number) {
        return this.http.post(`${this.apiUrl}/delete/${encodeURIComponent(id)}`, {})
            .pipe(catchError((err) => {

              if(err.status !== 401){
                this.toaster.error('', 'An error occurred while deleting the rating!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
                return EMPTY;
            }));
    }

    updateRating(id: number, rating: any) {
        return this.http.post(`${this.apiUrl}/update/${encodeURIComponent(id)}`, rating)
            .pipe(catchError((err) => {

              if(err.status !== 401){
                this.toaster.error('', 'An error occurred while updating the rating!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
                return EMPTY;
            }));
    }

    findByUser(id: number) {
        return this.http.get(`${this.apiUrl}/user/${encodeURIComponent(id)}`)
            .pipe(catchError((err) => {
              if(err.status !== 401){
                this.toaster.error('', 'An error occurred while fetching ratings!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
                return EMPTY;
            }));
    }

    findByUserIdAndSenderId(userId: number, senderId: number) {
        return this.http.get(`${this.apiUrl}/user/${encodeURIComponent(userId)}/sender/${encodeURIComponent(senderId)}`)
            .pipe(catchError((err) => {

              if(err.status !== 401){
                this.toaster.error('', 'An error occurred while fetching ratings!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
                return EMPTY;
            }));
    }





}
