import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any[] {
   if(args[0] && args[0]!=='' ){
      return value.filter((event) => event.country.toLowerCase().includes(args[0].toLowerCase()));
   }
   if(args[1] && args[1]!=='' ){
      return value.filter((event) => event.startDate==args[1]);
   }
   if (args[2] && args[2] !== '') {
    return value.filter((event) => {
      if (event.titre != null) {
        return event.titre.toLowerCase().includes(args[2].toLowerCase());
      } else if (event.title != null) {
        return event.title.toLowerCase().includes(args[2].toLowerCase());
      }
    });  }
  if (args[3] && args[3] !== '') {
    return value.filter((event) => {
      if (event.categorie != null) {
        return event.categorie.toLowerCase().includes(args[3].toLowerCase());
      } else if (event.category != null) {
        return event.category.toLowerCase().includes(args[3].toLowerCase());
      }
    });
  }
    return value;
  }

}
