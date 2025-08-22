import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from 'src/app/Models/User';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {CoachService} from 'src/app/services/coach.service';

@Component({
  selector: 'app-chooseprofessional',
  templateUrl: './chooseprofessional.component.html',
  styleUrls: ['./chooseprofessional.component.css']
})
export class ChooseprofessionalComponent  {
  @Input() idProject = 0;
  @Input() visible = false;
  @Input() typeModel = "";
  @Output() close = new EventEmitter();
  coachs$!: Observable<User[]>;
  loading = true;
  searchText: string = ''
  searchKeys: string[] = ['nom', 'email', 'country', 'prenom', 'phoneNumber'];
  coachs: User[] = [];
  loggedUser$: Observable<User | null>;
  user!: User | null;
  subscriptions: any;
  Openinfo: boolean = false;
  interventionApplicationVisibile: boolean = false;
  selectedUser: number = 0;
  constructor(private coachService: CoachService, private loginService: AuthenticationService) {
    this.loggedUser$ = this.loginService.loggedIn$;
      this.loggedUser$.subscribe(user => this.user = user)
  }
  selectCoach(userid: number) {
    if(this.typeModel=="help"){
    this.close.emit();
    this.Openinfo = false;
    this.interventionApplicationVisibile = true;
    this.selectedUser = userid;
    }

  }
  ngOnChanges() {
    if (this.visible) {
      this.searchText = ''
      this.fetchCoaches();
    }
  }

  fetchCoaches() {
    this.coachs$ = this.coachService.findALl()
    this.loading = false;
  }
    closeApplication() {
    this.interventionApplicationVisibile = false;
    this.selectedUser = 0;
  }


  closeModal() {
    this.visible = false;
        this.close.emit();

  }

}
