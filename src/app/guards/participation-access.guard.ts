import { CanActivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {ProgramParticipationService} from "../services/program-participation.service";
import {ProgramStepResponseService} from "../services/program-step-response.service";
import {map} from "rxjs";
import {getItem} from "../utils/localStorage";

export const participationAccessGuard: CanActivateFn = (route, state) => {
  // return inject(ProgramStepResponseService).getProgramStepResponse(parseInt(<string>route.queryParams["id"])).pipe(map((program) => {return program[0].idUsers.includes(getItem('user').id)||program[0].idEntrepreneurs==getItem('user').id||program[0].idCoachs==getItem('user').id}));
  return true;
};
