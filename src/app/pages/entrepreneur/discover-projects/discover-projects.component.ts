import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Subscription } from 'rxjs';
import { ProjectApiService } from 'src/app/api/project-api.service';
import { Project } from 'src/app/Models/Projet';
import { EditableService } from 'src/app/services/editable.service';
import { ProjectService } from 'src/app/services/project.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-discover-projects',
  templateUrl: './discover-projects.component.html',
  styleUrls: ['./discover-projects.component.css']
})
export class DiscoverProjectsComponent implements OnDestroy {
  projectMenuVisibility: boolean[] = [];
  visible2: boolean = false;
  project = new Project();
  page: number = 0;
  private subscriptions: Subscription = new Subscription();
  loading = true;
  loadingSubject = new BehaviorSubject<boolean>(false);
  PublicProjectSubject = new BehaviorSubject<Project[]>([]);
  projects$: Observable<Project[]>;
  size = 10;
  constructor(
    public translationService: TranslationService,
    private editableService: EditableService,
    private projectService: ProjectApiService,
    private router: Router
  ) {
    this.projects$ = this.PublicProjectSubject.asObservable();
    this.loadPublicProject();
  }
  loadPublicProject(): void {
    this.loadingSubject.next(true);
    this.editableService.setIsEditable(false);   
    this.projectService.findPublicProjects(this.page,this.size).pipe(
      catchError(error => {
        return [];
      })
    ).subscribe( project=> {
      this.PublicProjectSubject.next([...this.PublicProjectSubject.getValue(), ...project]);
      this.projectMenuVisibility = Array(project.length).fill(false);
      this.loadingSubject.next(false);
    });
  }

  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.loadingSubject.value) {
      this.page++;
      this.loadPublicProject();
    }
  }

  toggleMenu(index: number) {
    this.projectMenuVisibility[index] = !this.projectMenuVisibility[index];
  }



  showDialog2(project: Project) {
    this.router.navigate(['/feed/my-business/detail'], { queryParams: { id: project.id } });
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
