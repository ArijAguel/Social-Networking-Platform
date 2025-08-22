import { ResolveFn } from '@angular/router';
import { Etape3 } from '../Models/Etape3/Etape3';
import { inject } from '@angular/core';
import { Etape3ApiService } from '../api/etape3-api.service';

export const etape3Resolver: ResolveFn<Etape3> = (route, state) => {
  return    inject(Etape3ApiService).findByProjectId(parseInt(<string>route.paramMap.get("id")) );
}
