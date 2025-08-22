import {Component} from '@angular/core';
import {TrainingFormApiService} from "../../api/training-form-api.service";

export class TrainingForm {
  fullName: string = "";
  email: string = "";
  creationDate: Date = new Date();
  title: string = "";
  phone: string = "";
  experience: string = "";
  motivation: string = "";
  goals: string = "";
}
@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent {
  form = new TrainingForm();

  constructor(private trainingFormApi: TrainingFormApiService) {
  }

  submit() {
    this.trainingFormApi.create(this.form).subscribe();
  }
}
