import { Pipe, PipeTransform } from '@angular/core';
import {Notification} from "../Models/Notification";

@Pipe({
  name: 'notification'
})
export class NotificationPipe implements PipeTransform {

  transform(value: Notification[], ...args: unknown[]): number {
    let count = 0
    if(value.length !=0){
      for(let notif of value){
        notif.viewed ? count +=0 :count+=1
      }
    }
    return count;
  }

}
