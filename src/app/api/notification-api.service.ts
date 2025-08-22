import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Notification} from '../Models/Notification'; // Assuming you have a model named NotificationDto
import {CONSTANTS} from '../config/constant';

@Injectable({
  providedIn: 'root'
})
export class NotificationApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/notification`;

  constructor(private toaster: ToastrService, private http: HttpClient) {
  }

  markSeen() {
    return this.http.patch<Notification[]>(`${this.apiUrl}/seen`, null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        // notification.viewed = false
        return EMPTY
      }))
  }

  getUnseen() {
    return this.http.get<number>(`${this.apiUrl}/count`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))

  }

  delete(id: number) {
    return this.http.delete<Notification[]>(`${this.apiUrl}/delete/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }

  getNotifications(page: number) {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications?page=${page}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }))
  }
}
