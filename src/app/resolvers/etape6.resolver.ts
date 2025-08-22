import { ResolveFn } from '@angular/router';
import { Etape6 } from '../Models/Etape6/Etape6';
import { Etape6ApiService } from '../api/etape6-api.service';
import { inject } from '@angular/core';

export const etape6Resolver: ResolveFn<Etape6> = (route, state) => {
  return    inject(Etape6ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
};
