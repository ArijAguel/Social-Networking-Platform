import {Injectable} from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {EMPTY} from "rxjs";
import {catchError} from "rxjs/operators";
import {Message} from "../Models/Message";
import {InBox} from "../Models/InBox";

@Injectable({
  providedIn: 'root'
})
export class MessageApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/message`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  findChat( idReceiver: number) {
    return this.http.get<Message[]>(`${this.apiUrl}/chat/${encodeURIComponent(idReceiver)}` )
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching chat messages!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  findInbox() {
    return this.http.get<InBox>(`${this.apiUrl}/inbox` )
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching chat messages!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  addUserToInbox(id: number) {
    return this.http.post<number>(`${this.apiUrl}/inbox/addUser`, id)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching chat messages!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  markSeen(id: number) {
    return this.http.get<void>(`${this.apiUrl}/seen/${id}` )
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching chat messages!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  deleteChat(  idReceiver: number) {
    return this.http.delete<Message[]>(`${this.apiUrl}/delete/${encodeURIComponent(idReceiver)}` )
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting chat messages!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  getUserInbox() {
    return this.http.get<InBox>(`${this.apiUrl}/inbox`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting chat messages!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  deleteMessage(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/delete/message/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting chat messages!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
}
