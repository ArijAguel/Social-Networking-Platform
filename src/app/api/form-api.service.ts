import {Injectable} from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {CloudinaryApiService} from "./cloudinary-api.service";
import {catchError} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {Form} from "../Models/Form";
import {Question} from "../Models/Question";

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  private apiUrl = `${CONSTANTS.API_BASE_URL}/form`;

  constructor(private router: Router, private toaster: ToastrService, private http: HttpClient, private cloudinaryService: CloudinaryApiService) {
  }

  getForms() {
    return this.http.get<Form[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  createForm(form: Form) {

    return this.http.post<void>(`${this.apiUrl}/create`, form)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  getFormById(queryParam: number) {
    return this.http.get<Form>(`${this.apiUrl}/detail/${encodeURIComponent(queryParam)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  deleteForm(id: number) {
    return this.http.delete<Form[]>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  getFormByCode(queryParam: string) {
    return this.http.get<Form>(`${this.apiUrl}/code/${encodeURIComponent(queryParam)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));

  }

  submitForm(questions: Question[]) {

    return this.http.post<void>(`${this.apiUrl}/response`, questions)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
}
