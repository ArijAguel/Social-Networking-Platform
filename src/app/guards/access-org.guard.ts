import {CanActivateFn} from '@angular/router';

export const accessOrgGuard: CanActivateFn = (route, state) => {
  //TODO
  //return inject(OrganizationService).findById(parseInt(<string>route.queryParams["id"])).pipe(map((org) => {return org.privateOrganization?org.users.map(user=>user.id).includes(getItem('user').id):true;}));
  return true;

};
