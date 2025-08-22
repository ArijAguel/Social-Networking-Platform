import { Injectable } from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {User} from "../Models/User";
import {catchError, EMPTY, tap} from "rxjs";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PermissionApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}`;

  constructor(private router: Router, private http: HttpClient) { }

  findById(id:number){
    return this.http.get<Boolean>(`${CONSTANTS.API_BASE_URL}/user/${encodeURIComponent(id)}`)
      .pipe(tap((data) => {
        if(!data){
          this.router.navigate(['/pricing']);
        }
      }));
  }
}
