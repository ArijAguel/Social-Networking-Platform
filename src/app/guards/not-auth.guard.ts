import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const notAuthGuard: CanActivateFn = (route, state) => {

  return  true;
};
