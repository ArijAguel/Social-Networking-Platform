import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-entrepreneur',
  templateUrl: './entrepreneur.component.html',
  styleUrls: ['./entrepreneur.component.css']
})
export class EntrepreneurComponent {
  user$: Observable<User | null>
  constructor(private loginService: AuthenticationService, private activatedRoute: ActivatedRoute,) {
        this.user$ = this.loginService.loggedIn$
    }
}
