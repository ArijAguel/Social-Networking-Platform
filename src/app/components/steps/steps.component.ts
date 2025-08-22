import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent {
  @Input() activeStep: number =1;
  @Input() projectId?: number =1;
  steps =[1, 2, 3, 4, 5, 6, 7]
}
