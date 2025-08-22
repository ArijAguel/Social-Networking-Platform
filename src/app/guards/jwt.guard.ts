import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
export const jwtGuard: CanActivateFn = (route, state) => {
 if(!(inject(AuthenticationService).isTokenValid())){
   inject(Router).navigate(['/'])
 }
  return inject(AuthenticationService).isTokenValid();
};
