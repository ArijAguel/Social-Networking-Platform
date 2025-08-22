import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    if( value == null) return null;
    const inputDateTime = new Date(value);
    const day = String(inputDateTime.getUTCDate()).padStart(2, '0');
    const month = String(inputDateTime.getUTCMonth() + 1).padStart(2, '0');
    const year = String(inputDateTime.getUTCFullYear());
    const hours = String(inputDateTime.getUTCHours()).padStart(2, '0');
    const minutes = String(inputDateTime.getUTCMinutes()).padStart(2, '0');
    const transformedDate = `${day}/${month}/${year} à ${hours}:${minutes}`;
    return transformedDate;
  }

}
