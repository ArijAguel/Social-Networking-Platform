import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Project} from 'src/app/Models/Projet';
import {ProjectService} from 'src/app/services/project.service';
import {UserApiService} from "../../../api/user-api.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  projects$: Observable<Project[]>;
  project = new Project();

  editable!: boolean;

  constructor(
    private userService: UserApiService,
    private projectService: ProjectService,
    private router: Router,
  ) {
    this.projectService.findByUser();
    this.projects$ = this.projectService.projects$;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showDialog() {
    this.subscriptions.add(
      this.userService.hasPermissionBusiness().subscribe((data) => {
        if (data) {
          this.router.navigate(['/feed/my-business/create']);
        }
      })
    );
  }

  showDialog2(project: Project) {
    this.router.navigate(['/feed/my-business/detail'], { queryParams: { id: project.id } });
  }


}
