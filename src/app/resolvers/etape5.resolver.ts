import { ResolveFn } from '@angular/router';
import { Etape5 } from '../Models/Etape5/Etape5';
import { Etape5ApiService } from '../api/etape5-api.service';
import { inject } from '@angular/core';

export const etape5Resolver: ResolveFn<Etape5> = (route, state) => {
  return    inject(Etape5ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
};
