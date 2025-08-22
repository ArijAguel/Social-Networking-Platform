import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { map, tap } from 'rxjs';
import {getItem} from "../utils/localStorage";


export const accessStepsGuard: CanActivateFn = (route, state) => {
  return inject(ProjectService).findById(parseInt(<string>route.paramMap.get("id")))
    .pipe(
      map((project) => {
        return project.publique || project.entrepreneur.id == getItem('user').id || project.coFoundersId.includes(getItem('user').id) || (project.coach !== null && project.coach.id== getItem('user').id);
      })
    );
};


