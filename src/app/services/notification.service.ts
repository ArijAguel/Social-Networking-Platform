import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {NotificationApiService} from "../api/notification-api.service";
import {CONSTANTS} from "../config/constant";
import {getItem} from "../utils/localStorage";
import {Notification} from "../Models/Notification";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  count$ = new Subject<void>();
  socket: any;
  notifications = new Subject<Notification []>()
  notifications$ = this.notifications.asObservable()

  constructor(private toaster: ToastrService, private notificationApiService: NotificationApiService) {
    this.getNotifications()
  }

  getUnseen() {
    return this.notificationApiService.getUnseen()
  }

  handleNotification(notifs: Notification[]) {
    this.notifications.next(notifs)
    this.count$.next()
  }

  getNotifications() {
    if (getItem('user')) {
      this.socket = new WebSocket(`${CONSTANTS.API_WS_BASE_URL}?token=${getItem('user')?.token}`);

      this.socket.onopen = () => {
      };

      this.socket.onmessage = (event: any) => {
        let notif = JSON.parse(event.data) as Notification[]
        this.handleNotification(notif)
        if (notif[0].viewed) {
          this.toaster.info('', 'You have a new notification', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });
        }
      };

      this.socket.onclose = () => {
      };

      this.socket.onerror = () => {
      };
    }
  }

  markSeen() {
    this.notificationApiService.markSeen().subscribe((data) => {
      this.count$.next()
    })
  }

  deleteNotif(id: number) {
    this.notificationApiService.delete(id).subscribe((data) => {
      this.count$.next()
    })
  }

  closeWebSocket() {
    if (this.socket) {
      this.socket.close();
    }
    this.notifications.next([])
  }

  getUserNotifications(page: number) {
    return this.notificationApiService.getNotifications(page);
  }
}
