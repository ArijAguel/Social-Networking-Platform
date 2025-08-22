import {Component} from '@angular/core';
import {FormApiService} from "../../api/form-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";
import {Question, Response} from "../../Models/Question";

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent {
  questions: Question [] = [];
  submitted = false;
  message = "";
  form$ = this.formService.getFormByCode(this.activatedRoute.snapshot.queryParams['code']).pipe(tap(form => {
    this.submitted = form.submitted;
    this.message = "You have already submitted this form."
    form.question.responses.push(new Response())
    this.questions.push(form.question)
  }));
  currentLink = "";

  constructor(private formService: FormApiService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  onCheckboxChange(event: any, optionLink: string) {
    if (event.target.checked) {
      this.questions[this.questions.length - 1].responses[0].responses.push(optionLink);
    } else {
      this.questions[this.questions.length - 1].responses[0].responses = this.questions[this.questions.length - 1].responses[0].responses.filter(link => link !== optionLink);
    }
  }
  nextQuestion(type: String) {
    if (type === 'LINKED') {
      this.questions[this.questions.length - 1].responses[0].response = this.currentLink;
      let q = this.questions[this.questions.length - 1].nextLinkers.filter(linker => linker.link == this.currentLink)[0].nextQuestion
      q.responses.push(new Response())
      this.questions.push(q);
      this.currentLink = "";
    } else {
      let q = this.questions[this.questions.length - 1].nextLinkers[0].nextQuestion
      q.responses.push(new Response())
      this.questions.push(q);
    }
  }

  previousQuestion() {
    this.questions.pop();
  }

  submitQuestions() {
    this.formService.submitForm(this.questions).subscribe(() => {
      this.submitted = true;
      this.message = "Your form has been submitted successfully, thank you."
    });
  }

  close() {
    this.router.navigate(['/feed']).then();
  }
}
