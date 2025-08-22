import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'organizationSector'
})
export class OrganizationSectorPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {

      case 'AGRICULTURE': return'Agriculture';
        case 'BANKING_FINANCE':return 'Banking Finance';
        case 'CONSTRUCTION':return 'Construction';
        case 'EDUCATION':return 'Education';
        case 'ENERGY':return 'Energy';
        case 'HEALTHCARE': return'Healthcare';
        case 'INFORMATION_TECHNOLOGY':return 'Information Technology';
        case 'MANUFACTURING':return 'Manufacturing';
        case 'MINING':return 'Mining';
        case 'NON_PROFIT': return'Non Profit';
        case 'PHARMACEUTICAL':return 'Pharmaceutical';
        case 'REAL_ESTATE':return 'Real Estate';
        case 'RETAIL': return'Retail';
        case 'TELECOMMUNICATIONS':return 'Telecommunications';
        case 'TRANSPORTATION': return'Transportation';
        case 'TRAVEL_HOSPITALITY':return 'Travel Hospitality';
        case 'GOVERNMENT':return 'Government';
        case 'MEDIA_ENTERTAINMENT':return 'Media Entertainment';
      default:
        return '';
    }
  }

}
