import { ResolveFn } from '@angular/router';
import { Etape8 } from '../Models/Etape8/Etape8';
import { Etape8ApiService } from '../api/etape8-api.service';
import { inject } from '@angular/core';

export const etape8Resolver: ResolveFn<Etape8> = (route, state) => {
  return    inject(Etape8ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
};