import { Component } from '@angular/core';
import {ProgramParticipationService} from "../../services/program-participation.service";

@Component({
  selector: 'app-programs-as-coach',
  templateUrl: './programs-as-coach.component.html',
  styleUrls: ['./programs-as-coach.component.css']
})
export class ProgramsAsCoachComponent {

  programs$ = this.programParticipationService.getProfessionalParticipations();
  constructor(private programParticipationService:ProgramParticipationService ) { }
}
