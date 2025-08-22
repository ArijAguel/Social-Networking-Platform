import {Component, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {map, Observable, startWith, Subject, switchMap} from 'rxjs';
import {Project} from 'src/app/Models/Projet';
import {User} from 'src/app/Models/User';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {EditableService} from 'src/app/services/editable.service';
import {ProjectService} from 'src/app/services/project.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent {
  menu=false;
  deleteDialog = false;
  businessId!: number;
  business = new Subject<number>();
  business$ = this.business.pipe(startWith(this.activatedRoute.snapshot.queryParams['id']),switchMap((value) => this.projectService.findById(value)),map((data) => {
    return data}))
  loggedUser$: Observable<User | null>;
  canAddCoFounder =false
  user!:User | null

  toggleMenu(){
    this.menu = !this.menu;
  }
  trackById(index: number, item: any): number {
    return index; // or item.id if your items have unique IDs
  }
  refresBusiness(value: any) {
    this.business.next(this.activatedRoute.snapshot.queryParams['id']);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.clickedInsideDropdown(event)) {
      this.closeAllDropdowns();
    }
  }

  clickedInsideDropdown(event: MouseEvent): boolean {
    const clickedElement = event.target as HTMLElement;
    return clickedElement.closest('.relative') !== null;
  }

  closeAllDropdowns(): void {
    this.menu=false;
  }

  constructor(    private translate: TranslateService,private loginService: AuthenticationService, private editableService:EditableService,private router:Router,private projectService:ProjectService,private activatedRoute:ActivatedRoute) {
    this.loggedUser$ = this.loginService.loggedIn$;
    this.loggedUser$.subscribe(user => {
      this.user=user
    });
  }
  edit:boolean=false
  isAuthorized(project: Project) {
    if (project.coFoundersId.includes(this.user!.id) || project.entrepreneur.id == this.user!.id) {
      this.editableService.setIsEditable(true);
      this.edit=true
      return true;
    } else if ((project.coaches != null && project.coaches.length != 0 && project.coaches.map((user) => user.id).includes(this.user!.id)) || (project.investors != null && project.investors.some(investor => investor.id == this.user!.id))) {
      this.editableService.setIsEditable(false);
      this.edit=false
      return true;
    }
    else {
      this.editableService.setIsEditable(false);
      this.edit=false
      return false;
    }
  }
  GoToSteps(project: Project) {
    this.router.navigate(['feed', 'etape', project.id, 1]);
  }
  update(project: Project) {
    this.router.navigate(['/feed/my-business/create'], { queryParams: { id: project.id } })
  }
  delete(id: number) {
    this.businessId=id
    this.deleteDialog=true;
    this.toggleMenu()
  }
  confirmDelete() {
    this.projectService.delete(this.businessId);
    this.router.navigate(['/feed/my-business'])
  }
  makePublicOrPrivate(id: number) {
    this.refresBusiness(null)
    this.projectService.changeVisibility(id);
  }
  getTranslationKey(project: Project): string {
    return project.publique ? this.translate.instant('MAKE_PRIVATE') : this.translate.instant('MAKE_PUBLIC');
  }
  closeDelete() {
    this.deleteDialog = false;
  }

  removeCoach(id: number, idBusiness: number) {
    this.projectService.removeCoach(id, idBusiness).subscribe(() => {
        this.business.next(this.activatedRoute.snapshot.queryParams['id'])
      }
    )
  }

  leaveBusiness(id: number) {
    if (this.user) {
      this.projectService.removeCoach(this.user.id, id).subscribe(() => {
          this.router.navigate(['/dashboard/professional/business-as-professional']).then()
        }
      )
    }
  }
}
