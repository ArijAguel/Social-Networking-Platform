import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {of, switchMap, tap} from "rxjs";
import {UserApiService} from "../api/user-api.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

export const isEmailVerifiedGuard: CanActivateFn = (route, state) => {

  return inject(AuthenticationService).isEmailVerified$
};
