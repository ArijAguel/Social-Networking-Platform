import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {getItem} from "../utils/localStorage";
import {CONSTANTS} from "../config/constant";
import {Message} from "../Models/Message";
import {MessageApiService} from "../api/message-api.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {



  socket:any;
  messages = new BehaviorSubject<Message[]>([])
  reconnectInterval: any;
  constructor(private toaster: ToastrService,private messageApiService:MessageApiService) {

  }
  addUserToInbox(id:number){
    return this.messageApiService.addUserToInbox(id);
  }
  startReconnectTimer(id:number) {
    if (!this.reconnectInterval) {
      this.reconnectInterval = setInterval(() => {
        this.closeWebSocket();
        this.getMessages(id);
      }, 2000); // Attempt to reconnect every 2 seconds
    }
  }
  handleMessages(msgs:Message[]){
    const currentMessages = this.messages.getValue();
    let updatedMessages: Message[] = []
    if (msgs.length == 1 && msgs[0].action === "MARK") {
      currentMessages.forEach((message) => {
        message.seen = true;
      })
      updatedMessages = currentMessages
    } else {
      updatedMessages = [...currentMessages, ...msgs];
    }
    this.messages.next(updatedMessages);
  }
  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }
  getMessages(id:number){
    if(getItem('user')) {
      this.socket = new WebSocket(`${CONSTANTS.API_WS_BASE_URL}/chat?token=${getItem('user')?.token}&&id=${id}`);

      this.socket.onopen = () => {
      };

      this.socket.onmessage = (event: any) => {

        this.handleMessages(JSON.parse(event.data))
        // const markSeenObservables = [];
        // for (const message of JSON.parse(event.data)) {
        //   if (message.sender.id !== getItem('user')?.id && !message.seen) {
        //     markSeenObservables.push(this.markSeen(message.id));
        //   }
        // }
        // forkJoin(markSeenObservables).subscribe(() => {
        //   this.sendMessage(JSON.stringify({message: '', id: 0, delete: true}));
        // })
      };

      this.socket.onclose = () => {
      };

      this.socket.onerror = (error: any) => {
        this.startReconnectTimer(id);
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
    this.messages.next( [])
  }

  deleteMessage(id: number) {
    return this.messageApiService.deleteMessage(id);
  }
}
