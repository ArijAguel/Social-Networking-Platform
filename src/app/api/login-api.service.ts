import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginDto } from '../Models/dto/LoginDto';
import { AuthenticationDto } from '../Models/dto/AuthenticationDto';
import { CONSTANTS } from '../config/constant';
import { EMPTY, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(private toaster: ToastrService,private http:HttpClient) { }
  login(loginDto: LoginDto){
    return  this.http.post<AuthenticationDto>(`${CONSTANTS.API_BASE_URL}/auth/authenticate`,loginDto)
      .pipe(catchError((error) => {
        this.toaster.error('', 'Verifiez votre e-mail ou mot de passe!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY
      }))

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
}