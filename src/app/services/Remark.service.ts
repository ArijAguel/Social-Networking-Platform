import { Injectable } from '@angular/core';
import { RemarqueApiService } from '../api/remarque-api.service';
import { Remarque } from '../Models/Remarque';

@Injectable({
  providedIn: 'root'
})
export class RemarkService {
    constructor(private remarqueApiService:RemarqueApiService) {}

    create(remarque:Remarque) {
        return this.remarqueApiService.create(remarque).subscribe(data=>{})
    }
    update(remarque:Remarque) {
        return this.remarqueApiService.update(remarque).subscribe(data=>{})
    }
    delete(id:number) {
        return this.remarqueApiService.delete(id).subscribe(data=>{})
    }
}