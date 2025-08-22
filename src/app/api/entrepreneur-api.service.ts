import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {CONSTANTS} from '../config/constant';
import {User} from '../Models/User';


@Injectable({
  providedIn: 'root'
})
export class EntrepreneurApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/entrepreneur`;
  private apiUrl2 = `${CONSTANTS.API_BASE_URL}/user`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }


  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl2}/allUsersV2`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred while fetching users!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        }); }
        return EMPTY;
      }));
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching entrepreneur details!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  findAllPage(page: number) {
    return this.http.get<User[]>(`${this.apiUrl}/all?page=${encodeURIComponent(page)}&paginate=true`)
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
