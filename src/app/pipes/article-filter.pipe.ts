import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleFilter'
})
export class ArticleFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any[] {
   if (args[0] && args[0] !== '') {
    return value.filter((article) => article.titre.toLowerCase().includes(args[0].toLowerCase()));
    }
    if (args[1] && args[1] !== '') {
       return value.filter((article) => article.categorie.toLowerCase().includes(args[1].toLowerCase()));
    }
    return value;
  }

}
