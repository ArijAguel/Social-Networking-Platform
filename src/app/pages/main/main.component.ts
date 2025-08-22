import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {MessageNotificationService} from "../../services/message-notification.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  user$;
  constructor(private authService:AuthenticationService,private messageNotifSerivce:MessageNotificationService) {
    this.user$ = this.authService.loggedIn$;
  }
}
