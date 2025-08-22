import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const authenticatedGuard: CanActivateFn = (route, state) => {
  return  inject(AuthenticationService).isLoggedIn$;
};
