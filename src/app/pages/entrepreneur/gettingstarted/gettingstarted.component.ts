import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gettingstarted',
  templateUrl: './gettingstarted.component.html',
  styleUrls: ['./gettingstarted.component.css']
})
export class GettingstartedComponent implements OnDestroy {
  projectId!: number;
  private routeSub!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['id'];
    });
  }

  startNow() {
    this.router.navigate(['feed', 'etape', this.projectId, 1]);
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}