import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AdminApiService } from '../api/admin-api.service';

export const OrganisationPerSector:ResolveFn<number[]> = (route, state) => {
  return inject(AdminApiService).getOrganisationPerSector();
};
