import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {map} from "rxjs";

export const isAdminGuard: CanActivateFn = (route, state) => {
  return inject(UserService).getRoles().pipe(map((roles)=> roles.includes("ADMIN")));
};
