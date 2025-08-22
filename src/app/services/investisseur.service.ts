import {Injectable} from '@angular/core';
import {InvestisseurApiService} from "../api/investisseur-api.service";

@Injectable({
  providedIn: 'root'
})
export class InvestisseurService {
  constructor( private InvestisseurApiService: InvestisseurApiService) {
  }
  findALl(){
    return this.InvestisseurApiService.findAll();
  }

  findAllPage(page: number) {

    return this.InvestisseurApiService.findAllPage(page);
  }
}
