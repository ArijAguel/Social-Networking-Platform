import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value){
      case "INVESTISSEUR" :return  'Investor'
      case "COACH" :return  'Professional'
      case "ENTREPRENEUR" :return  'Entrepreneur'
      case "SSO" :return  'SSO Representer'
    }
    return null;
  }

}
