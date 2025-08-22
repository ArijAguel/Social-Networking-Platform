import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultimage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value !==null && value !=="" && value !=="null" ? value:`https://ui-avatars.com/api/?name=${args[0]}+${args[1]}&uppercase=true&color=ffffff&background=c0aa81&rounded=${!args[2]}`
  }
}
