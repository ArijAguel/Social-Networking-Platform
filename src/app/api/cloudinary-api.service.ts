import { Injectable } from '@angular/core';
import {catchError, EMPTY, Observable, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CONSTANTS} from "../config/constant";

@Injectable({
  providedIn: 'root'
})
export class CloudinaryApiService {

  constructor(private toaster: ToastrService,private http:HttpClient,) { }
  public upload(image: File): Observable<any> {
    const toast = this.toaster.info('', 'Image uploading', {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: false,
      tapToDismiss: false,
        positionClass: 'toast-bottom-right'
    });
    const formData = new FormData();
    formData.append("file",image)
    formData.append('upload_preset', "garkclub");
    return this.http.post<any>(CONSTANTS.CLOUDINARY_URL, formData).pipe(catchError((err)=>{
      this.toaster.error('', 'Error occured');
      return EMPTY
    }),tap( ()=>this.toaster.clear(toast.toastId)));
  }

  public delete(publicId: string): Observable<any> {
    const url = `${CONSTANTS.CLOUDINARY_URL}/destroy`;
    const body = { public_id: publicId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const toast = this.toaster.info('', 'Image deleting', {
      timeOut: 0,
      extendedTimeOut: 0,
      closeButton: false,
      tapToDismiss: false,
      positionClass: 'toast-bottom-right'
    });

    return this.http.post<any>(url, body, { headers }).pipe(
      catchError((err) => {
        this.toaster.error('', 'Error occurred while deleting');
        return EMPTY;
      }),
      tap(() => this.toaster.clear(toast.toastId))
    );
  }
}
