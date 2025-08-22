import {Injectable} from '@angular/core';
import {SsoApiService} from "../api/sso-api.service";

@Injectable({
  providedIn: 'root'
})
export class SsoService {
  constructor( private ssoApiService: SsoApiService) {
  }
  findALl(){
    return this.ssoApiService.findAll();
  }

  findAllPage(page: number) {
    return this.ssoApiService.findAllPage(page);

  }
}
