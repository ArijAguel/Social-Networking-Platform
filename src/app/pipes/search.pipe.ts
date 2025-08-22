import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string, searchKeys: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return searchKeys.some(key => {
        if (item[key]) {
          if (Array.isArray(item[key])) {
            return item[key].some((subItem: string) => subItem.toLowerCase().includes(searchText));
          }
          return item[key].toLowerCase().includes(searchText);
        }
        return false;
      });
    });
  }
}
