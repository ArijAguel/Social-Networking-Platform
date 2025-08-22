import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable, tap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {CONSTANTS} from '../config/constant';
import {LoginDto} from '../Models/dto/LoginDto';
import {AuthenticationDto} from '../Models/dto/AuthenticationDto';
import {User} from '../Models/User';
import {NgxUiLoaderService} from "ngx-ui-loader";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationAPIService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/auth`;

  constructor(private toaster: ToastrService, private http: HttpClient,private ngxService: NgxUiLoaderService, ) { }

  register(request: User): Observable<any> {
    return this.http.post<AuthenticationDto>(`${this.apiUrl}/register`, request)
      .pipe(catchError((error) => {
        this.ngxService.stop()
        this.toaster.error(error.error.message ?? 'An error occurred','',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }


  login(loginDto: LoginDto){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return  this.http.post<AuthenticationDto>(`${this.apiUrl}/authenticate`,loginDto, { withCredentials:true, headers } )
      .pipe(

        catchError((error) => {
          this.ngxService.stop()
          this.toaster.error(error.error.message ?? 'An error occurred','',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }

  forgotPassword(request: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgotPassword`, request)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Password reset request failed!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  verifyCode(request: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verifyCode`, request)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Code verification failed!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  resetPassword(request: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resetPassword`, request)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Password reset failed!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }


  logout(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logout/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Logout failed!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
    getRoles(id: number){
    return  this.http.get<String>(`${CONSTANTS.API_BASE_URL}/auth/roles/${encodeURIComponent(id)}`)
      .pipe(catchError((error) => {
        this.toaster.error('', 'Une erreur s\'est produite',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))

  }


  verifyPasswordCode(param: { code: string; email: string }) {

    return this.http.post<any>(`${this.apiUrl}/verifyCode`,param)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Wrong Code!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }),tap(()=> this.toaster.success('', 'Code Verified!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        })));
  }
}
