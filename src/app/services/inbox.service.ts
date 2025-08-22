import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {MessageApiService} from "../api/message-api.service";
import {getItem} from "../utils/localStorage";
import {CONSTANTS} from "../config/constant";
import {InBox} from "../Models/InBox";

@Injectable({
  providedIn: 'root'
})
export class InboxService {



  socket:any;
  inbox = new BehaviorSubject<InBox>(new InBox())
  reconnectInterval: any;
  constructor(private toaster: ToastrService,private messageApiService:MessageApiService) {
  }

  handleMessages(inBox:InBox){
    this.inbox.next(inBox)
  }
  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }
  getInbox(){
    if(getItem('user')) {
      this.socket = new WebSocket(`${CONSTANTS.API_WS_BASE_URL}/inbox?token=${getItem('user')?.token}`);

      this.socket.onopen = (event: any) => {

      };

      this.socket.onmessage = (event: any) => {
        this.handleMessages(JSON.parse(event.data))
      };

      this.socket.onclose = () => {
      };

      this.socket.onerror = (error: any) => {
        // this.startReconnectTimer(id);
      };
    }
  }
  markSeen(id:number){
    return this.messageApiService.markSeen(id)
  }
  deleteNotif(id:number){
    // this.notificationApiService.delete(id).subscribe((data)=> {
    //   this.notifications.next(data)
    // })
  }
  closeWebSocket() {
    if (this.socket) {
      this.socket.close();
    }
    this.handleMessages( new InBox())
  }

  getUserInbox() {
    return this.messageApiService.getUserInbox();
  }
}
