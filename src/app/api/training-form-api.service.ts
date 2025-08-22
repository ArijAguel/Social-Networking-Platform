import {Injectable} from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {catchError, EMPTY, tap} from "rxjs";
import {TrainingForm} from "../pages/certification/certification.component";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TrainingFormApiService {

  constructor(private toaster: ToastrService, private http: HttpClient) {
  }


  create(form: TrainingForm) {
    return this.http.post<void>(`${CONSTANTS.API_BASE_URL}/training-form/create`, form)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
          this.toaster.error('', 'Application already sent!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Application was sent!', {
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }

  getAll() {
    return this.http.get<TrainingForm[]>(`${CONSTANTS.API_BASE_URL}/training-form/all`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
          this.toaster.error('', 'An error occurred !', {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }
        return EMPTY
      }))
  }
}
