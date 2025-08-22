import { ResolveFn } from '@angular/router';
import { Etape7 } from '../Models/Etape7/Etape7';
import { Etape7ApiService } from '../api/etape7-api.service';
import { inject } from '@angular/core';

export const etape7Resolver: ResolveFn<Etape7> = (route, state) => {
  return    inject(Etape7ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
};