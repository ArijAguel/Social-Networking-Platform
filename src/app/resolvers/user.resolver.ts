import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {UserApiService} from "../api/user-api.service";
import {getItem} from "../utils/localStorage";
import {User} from "../Models/User";

export const userResolver: ResolveFn<User> = (route, state) => {
  return inject(UserApiService).findById(getItem('user').id);
};
