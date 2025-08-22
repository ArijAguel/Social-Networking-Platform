import { Injectable } from '@angular/core';
import { CONSTANTS } from '../config/constant';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, catchError, tap } from 'rxjs';
import { User } from '../Models/User';
import { UpdatePaswordDto } from '../Models/dto/UpdatePawwordDto';
import { ImageUpload } from '../Models/dto/ImageUpload';
import { CodePromo } from '../Models/CodePromo';

@Injectable({
  providedIn: 'root'
})
export class  AdminApiService {

private apiUrl = `${CONSTANTS.API_BASE_URL}`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  getCountParam(){
    return this.http.get<number[]>(`${CONSTANTS.API_BASE_URL}/admin/countPrameters`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  getUserPerMonth(){
    return this.http.get<number[]>(`${CONSTANTS.API_BASE_URL}/admin/count-by-month`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
   getUserPerRole(){
    return this.http.get<number[]>(`${CONSTANTS.API_BASE_URL}/admin/cout-per-role`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  getOrganisationPerType(){
    return this.http.get<number[]>(`${CONSTANTS.API_BASE_URL}/admin/organisation-per-type`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  getOrganisationPerSector(){
    return this.http.get<number[]>(`${CONSTANTS.API_BASE_URL}/admin/organisation-per-sector`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  getAllUsers(){
    return this.http.get<any>(`${CONSTANTS.API_BASE_URL}/admin/getAllUsers`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting project!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }),tap(() => this.toaster.success('', 'User deleted successfully!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        })));
  }

  verify(id: number): Observable<any>{
    return this.http.get<void>(`${CONSTANTS.API_BASE_URL}/admin/verify/${encodeURIComponent(id)}`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  unVerify(id: number): Observable<any>{
    return this.http.get<void>(`${CONSTANTS.API_BASE_URL}/admin/unverify/${encodeURIComponent(id)}`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  addPromo(promo: CodePromo){
    return this.http.post<void>(`${CONSTANTS.API_BASE_URL}/admin/codepromo/add`,promo)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  getAllPromo(): Observable<CodePromo[]>{
    return this.http.get<CodePromo[]>(`${CONSTANTS.API_BASE_URL}/admin/codepromo/all`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
  deletePromo(id:number){
    return this.http.delete<void>(`${CONSTANTS.API_BASE_URL}/admin/codepromo/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }

}
