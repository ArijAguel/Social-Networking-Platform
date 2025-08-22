import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventApiService } from '../api/event-api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

    constructor(private toaster: ToastrService , private eventApiService: EventApiService) { }

    findAll(){
      return this.eventApiService.findAll();
    }
    getById(id: number){
      return this.eventApiService.getById(id);
    }
    addEvent(event: any, image: File | null){
      return this.eventApiService.addEvent(event, image);
    }
    getEventByUser(userId: number){
      return this.eventApiService.getEventByUser(userId);
    }
    getPreviousEvents(){
      return this.eventApiService.findPreviousEvents();
    }

    deleteEvent(id: number){
      return this.eventApiService.deleteEvent(id);
    }

    updateEvent(eventId:number , event: any, image: File | null){
      return this.eventApiService.updateEvent(eventId , event, image);
    }

}
