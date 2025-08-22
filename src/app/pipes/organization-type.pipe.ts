import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'organizationType'
})
export class OrganizationTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'INCUBATOR':
        return 'Incubator';
      case  'ACCELERATOR':
        return 'Accelerator';
      case  'VENTURE_BUILDER':
        return 'Venture Builder';
      case 'NGOS':
        return 'NGOs';
      case 'BUSINESSANGELS':
        return 'Business Angels';
      case 'NETWORK':
        return 'Network';
      case 'VENTURE_STUDIO':
        return 'Venture Studio';
      case  'OTHER':
        return 'Other';
      default:
        return '';
    }
  }

}
