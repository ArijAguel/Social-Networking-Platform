import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-termes-condition',
  templateUrl: './termes-condition.component.html',
  styleUrls: ['./termes-condition.component.css']
})
export class TermesConditionComponent {
    constructor(private elRef: ElementRef) {}
    scrollToElement(elementId: string): void {
    const element = this.elRef.nativeElement.querySelector('#' + elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


}
