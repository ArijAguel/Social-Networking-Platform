import {Pipe, PipeTransform} from '@angular/core';
import {OrganizationProgram} from "../Models/OrganizationProgram";

@Pipe({
  name: 'programFilter'
})
export class ProgramFilterPipe implements PipeTransform {

  transform(items: OrganizationProgram[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.name.toLowerCase().includes(searchText);
    });
  }

}
