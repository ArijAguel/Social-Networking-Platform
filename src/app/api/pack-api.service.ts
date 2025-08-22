import {Injectable} from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {CloudinaryApiService} from "./cloudinary-api.service";
import {EMPTY, Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {Pack} from "../Models/Pack";
import {Purchase} from "../Models/purchase";

@Injectable({
  providedIn: 'root'
})
export class PackApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/pack`;

  constructor(private toaster: ToastrService, private http: HttpClient, private cloudinaryService: CloudinaryApiService) { }

  findAll(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  findAllUserPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${this.apiUrl}/userPacks`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  getFeatures(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/features`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  create(pack:Pack): Observable<Pack[]> {
    return this.http.post<Pack[]>(`${this.apiUrl}/create`,pack)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  update(pack:Pack): Observable<Pack[]> {
    return this.http.post<Pack[]>(`${this.apiUrl}/update`,pack)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!');
        return EMPTY;
      }));
  }
  addFeature(pack:Pack): Observable<Pack[]> {
    return this.http.post<Pack[]>(`${this.apiUrl}/addFeature`,pack)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  delete(id:number): Observable<Pack[]> {
    return this.http.delete<Pack[]>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  removeFeature(pack: Pack) {
    return this.http.post<Pack[]>(`${this.apiUrl}/removeFeature`,pack)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!');
        return EMPTY;
      }));
  }

  choosePlan(id: number,voucher:string,error:{voucher:boolean}) {
    return this.http.get<Pack[]>(`${this.apiUrl}/choosePlan/${encodeURIComponent(id)}/${encodeURIComponent(voucher)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!');
        error.voucher = true;
        return EMPTY;
      }));
  }

  getPurchases() {

    return this.http.get<Purchase[]>(`${this.apiUrl}/purchase`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!');
        return EMPTY;
      }));
  }
  getAllPurchases() {

    return this.http.get<Purchase[]>(`${this.apiUrl}/purchase/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!');
        return EMPTY;
      }));
  }

  updatePurchase(id: number, status: string) {
    return this.http.get<Purchase[]>(`${this.apiUrl}/purchase/update/${encodeURIComponent(id)}/${encodeURIComponent(status)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!');
        return EMPTY;
      }));
  }

  removePurchase(id: number) {
    return this.http.delete<Purchase[]>(`${this.apiUrl}/purchase/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!');
        return EMPTY;
      }));
  }
}
