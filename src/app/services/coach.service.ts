import {Injectable} from '@angular/core';
import {CoachApiService} from "../api/coach-api.service";

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  constructor( private coachApiService: CoachApiService) {
  }
  findALl(){
    return this.coachApiService.findAll();
  }

  findAllPage(page: number) {
    return this.coachApiService.findAllPage(page);
  }
}
