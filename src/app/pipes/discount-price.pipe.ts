import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'discountPrice'
})
export class DiscountPricePipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    return value - (value * args[0] / 100);
  }

}
