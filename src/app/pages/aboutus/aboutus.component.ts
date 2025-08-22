import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {
  openIndexes: number[] = [];
  toggleAccordion(index: number) {
    const openIndex = this.openIndexes.indexOf(index);
    if (openIndex > -1) {
      this.openIndexes.splice(openIndex, 1);
    } else {
      this.openIndexes.push(index);
    }
  }
  isOpen(index: number) {
    return this.openIndexes.includes(index);
  }
  trackById(index: number, item: any): number {
    return index; // or item.id if your items have unique IDs
  }

}
