import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Project } from 'src/app/Models/Projet';
import { EditableService } from 'src/app/services/editable.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent {
  @Input()  project!:Project
  @Input() i!:number
  @Input() menuVisible!:boolean
  projectMenuVisibility: boolean[] = [];
  deleteDialog = false;

  constructor(
    private translate: TranslateService,
    private editableService: EditableService,
    private projectService: ProjectService,
    private router: Router,
  ){}
  closeDelete() {
    this.deleteDialog = false;
  }

  showDialog2(project: Project) {
    this.router.navigate(['/feed/my-business/detail'], { queryParams: { id: project.id } });
  }
  getTranslationKey(project: Project): string {
    return project.publique ? this.translate.instant('MAKE_PRIVATE') : this.translate.instant('MAKE_PUBLIC');
  }

  toggleMenu(index: number) {
    this.projectMenuVisibility[index] = !this.projectMenuVisibility[index];
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
    this.projectMenuVisibility.fill(false);
  }

  update(project: Project) {
    this.router.navigate(['/feed/my-business/create'], { queryParams: { id: project.id } })
  }
  makePublicOrPrivate(id: number) {
    this.projectService.changeVisibility(id);  }

  prospect() { }

  delete(id: number) {
    this.projectMenuVisibility[id]=false;
    this.deleteDialog=true;
  }
  confirmDelete() {
    this.projectService.delete(this.project.id);
  }
}
