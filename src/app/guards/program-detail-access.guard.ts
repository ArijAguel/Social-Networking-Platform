import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {ProgramService} from "../services/program.service";
import {map} from "rxjs";
import {getItem} from "../utils/localStorage";

export const programDetailAccessGuard: CanActivateFn = (route, state) => {
  // return inject(ProgramService).getProgram(parseInt(<string>route.queryParams["id"])).pipe(map((program) => {return program.organization.idUsers.includes(getItem('user').id)}));
  return true;
};
