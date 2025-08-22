import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Remarque } from '../Models/Remarque';

@Injectable({
  providedIn: 'root'
})
export class RemarkCharedDataService {

  private dataSubject = new BehaviorSubject<Remarque[]>([]);
  data$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }
}