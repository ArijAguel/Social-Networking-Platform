import {Pipe, PipeTransform} from '@angular/core';
import {OrganizationProgram} from "../Models/OrganizationProgram";

@Pipe({
  name: 'programSort'
})
export class ProgramSortPipe implements PipeTransform {

  transform(items: OrganizationProgram[], asc: boolean): any[] {
    if (!items) return [];
    return items.sort((a: OrganizationProgram, b: OrganizationProgram) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }

}
