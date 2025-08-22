import { Injectable } from '@angular/core';
import {CallApiService} from "../api/call-api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor( private callApiService: CallApiService) { }

  findAll(): Observable<any> {
    return this.callApiService.findAll();
  }

  findPreviousCalls() : Observable<any> {
    return this.callApiService.findPreviousCalls();
  }

  getById(id: number): Observable<any> {
    return this.callApiService.getById(id);
  }


  addCall(call: any, image: File | null): Observable<any> {
    return this.callApiService.addCall(call, image);
  }

  deleteCall(id: number): Observable<any> {
    return this.callApiService.deleteCall(id);
  }

  updateCall(call: any, image: File | null): Observable<any> {
    return this.callApiService.updateCall(call, image);
  }

  findAllByOrganizer(): Observable<any> {
    return this.callApiService.findAllByOrganizer();
  }
}
