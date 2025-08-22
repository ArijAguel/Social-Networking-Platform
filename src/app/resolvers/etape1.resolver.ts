import { ResolveFn } from '@angular/router';
import { Etape1 } from '../Models/Etape1/Etape1';
import { Etape1ApiService } from '../api/etape1-api.service';
import { inject } from '@angular/core';

export const etape1Resolver: ResolveFn<Etape1> = (route, state) => {
  return inject(Etape1ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
};
