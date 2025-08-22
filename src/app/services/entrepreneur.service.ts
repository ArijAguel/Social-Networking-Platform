import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {EntrepreneurApiService} from "../api/entrepreneur-api.service";
import {User} from "../Models/User";

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurService {
    entrepreneur = new BehaviorSubject<User[]>([]);
    entrepreneur$ = this.entrepreneur.asObservable()

    constructor( private entrepreneurApiService: EntrepreneurApiService) {
  }
  
  findAllUsers() {
    return this.entrepreneurApiService.findAllUsers();
  }
  findAllPage(page: number) {
    return this.entrepreneurApiService.findAllPage(page);

  }
}
