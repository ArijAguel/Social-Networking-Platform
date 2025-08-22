import { ResolveFn } from '@angular/router';
import { Etape4 } from '../Models/Etape4/Etape4';
import { inject } from '@angular/core';
import { Etape4ApiService } from '../api/etape4-api.service';

export const etape4Resolver:ResolveFn<Etape4> = (route, state) => {
  return    inject(Etape4ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
};
