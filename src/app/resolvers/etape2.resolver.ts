import { ResolveFn } from '@angular/router';
import { Etape2 } from '../Models/Etape2/Etape2';
import { Etape2ApiService } from '../api/etape2-api.service';
import { inject } from '@angular/core';

export const etape2Resolver: ResolveFn<Etape2> = (route, state) => {
  return    inject(Etape2ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
;
};
