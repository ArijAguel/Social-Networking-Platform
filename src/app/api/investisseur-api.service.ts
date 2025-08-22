import {Injectable} from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {User} from "../Models/User";
import {catchError} from "rxjs/operators";
import {Investisseur} from "../Models/investisseur";

@Injectable({
  providedIn: 'root'
})
export class InvestisseurApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/investor`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred while fetching entrepreneurs!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
        return EMPTY;
      }));
  }

  becomeInvestor(investisseur:Investisseur):Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/becomeInvestor`,investisseur)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  findAllPage(page: number) {
    return this.http.get<User[]>(`${this.apiUrl}/all?paginate=true&page=${encodeURIComponent(page)}`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
          this.toaster.error('', 'An error occurred while fetching entrepreneurs!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }
        return EMPTY;
      }));
  }
}
