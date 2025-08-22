import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NotificationApiService} from "../api/notification-api.service";
import {getItem} from "../utils/localStorage";
import {CONSTANTS} from "../config/constant";

@Injectable({
  providedIn: 'root'
})
export class MessageNotificationService {

  socket: any;
  msgsNumber = new BehaviorSubject<number>(0)
  msgsNumber$ = this.msgsNumber.asObservable()

  constructor(private toaster: ToastrService, private notificationApiService: NotificationApiService) {
    this.getNotifications()
  }

  getNotifications() {
    if (getItem('user')) {
      this.socket = new WebSocket(`${CONSTANTS.API_WS_BASE_URL}/messageNotif?token=${getItem('user')?.token}`);

      this.socket.onopen = () => {
      };

      this.socket.onmessage = (event: any) => {
        this.msgsNumber.next(event.data)

      };

      this.socket.onclose = () => {
      };

      this.socket.onerror = (error: any) => {
      };
    }
  }

  closeWebSocket() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
