import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, interval, Observable, of, Subscription} from 'rxjs';
import {Etape2} from 'src/app/Models/Etape2/Etape2';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {RemarkService} from 'src/app/services/Remark.service';
import {EditableService} from 'src/app/services/editable.service';
import {Etape2Service} from 'src/app/services/etape2.service';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-etape2',
  templateUrl: './etape2.component.html',
  styleUrls: ['./etape2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Etape2Component implements OnInit,CanComponentDeactivate{
  @ViewChild('remarqueTextarea') remarqueTextarea!: ElementRef;

  openIndexes: number[] = [];
  toggleAccordion(index: number) {
    const openIndex = this.openIndexes.indexOf(index);
    if (openIndex > -1) {
      this.openIndexes.splice(openIndex, 1);
    } else {
      this.openIndexes.push(index);
    }
  }
  isOpen(index: number) {
    return this.openIndexes.includes(index);
  }
  trackById(index: number, item: any): number {
    return index; // or item.id if your items have unique IDs
  }
  etape22:Etape2
  etape2: FormGroup;
  projectId:number=0
  isEditable:boolean = false
  user:User=new User()
  selectedType = 'PDF';
  private subscriptions: Subscription = new Subscription();
  canAddRemark!:boolean;
  videoUrl!: SafeResourceUrl;

  constructor(private translate: TranslateService, private remarkService: RemarkService, private toastr: ToastrService, private generatePDF: GeneratePdfService, private dataService: RemarkCharedDataService, private editableService: EditableService, private fb: FormBuilder, private etape2Service: Etape2Service, private activatedRoute: ActivatedRoute, private router: Router,private sanitizer: DomSanitizer) {
    this.translate.get('ENVIRONMENT_VIDEO').subscribe((url: string) => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

    this.etape22 = activatedRoute.snapshot.data["etape2"];
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.projectId = params['id'];
      })
    );
    this.dataService.sendData(this.etape22.remarques)

    this.etape2 = this.fb.group({
      id: this.etape22.id,
      newField:'',
      newfieldtable: this.fb.array([
        this.newnewfieldtable("Resources", this.etape22?.champs.find(champ => champ.nom === 'Resources')?.valeur || ''),
        this.newnewfieldtable("Weaknesses", this.etape22?.champs.find(champ => champ.nom === 'Weaknesses')?.valeur || ''),
        this.newnewfieldtable("Strengths", this.etape22?.champs.find(champ => champ.nom === 'Strengths')?.valeur || ''),
        this.newnewfieldtable("Threats", this.etape22?.champs.find(champ => champ.nom === 'Threats')?.valeur || ''),
        this.newnewfieldtable("Services", this.etape22?.champs.find(champ => champ.nom === 'Services')?.valeur || ''),
        this.newnewfieldtable("Activites", this.etape22?.champs.find(champ => champ.nom === 'Activites')?.valeur || ''),
        this.newnewfieldtable("Products", this.etape22?.champs.find(champ => champ.nom === 'Products')?.valeur || ''),
        this.newnewfieldtable("Skills", this.etape22?.champs.find(champ => champ.nom === 'Skills')?.valeur || '')  ,

      ]),
      capacitesTechniques: this.etape22?.capacitesTechniques,
      lacunesTechniques: this.etape22?.lacunesTechniques,
      actionsTechniques: this.etape22?.actionsTechniques,
      capacitesSoft: this.etape22?.capacitesSoft,
      lacunesSoft: this.etape22?.lacunesSoft,
      actionsSoft: this.etape22?.actionsSoft,
      capacitesPersonnelles: this.etape22?.capacitesPersonnelles,
      lacunesPersonnelles: this.etape22?.lacunesPersonnelles,
      actionsPersonnelles: this.etape22?.actionsPersonnelles,
      capacitesProfessionnelles: this.etape22?.capacitesProfessionnelles,
      lacunesProfessionnelles: this.etape22?.lacunesProfessionnelles,
      actionsProfessionnelles: this.etape22?.actionsProfessionnelles,
      conclusion:this.etape22?.conclusion,
      idee1:this.etape22?.idee1,
      idee2:this.etape22?.idee2,
      idee3:this.etape22?.idee3,
      Financial: this.fb.array([
      ]),
      Material: this.fb.array([
      ]),
      Immaterielle: this.fb.array([
      ]),
      Besoin:this.fb.array([
      ]),
      Actor:this.fb.array([
      ]),
    });
    if (this.etape22.champs.length > 8) {
    this.etape22.champs.slice(8).forEach(champ => {
        (this.etape2.get('newfieldtable') as FormArray).push(this.newnewfieldtable(champ.nom, champ.valeur));
    });
}

    if(this.etape22.ressourcesMaterielles.length > 0){
      this.etape22.ressourcesMaterielles.forEach(ressourcesMaterielle => {
        this.addMaterial(ressourcesMaterielle.name,ressourcesMaterielle.fondateur,ressourcesMaterielle.description,ressourcesMaterielle.disponibilite);
      })
    }
    else {this.addMaterial('','','','');
    }


    if(this.etape22.ressourcesFinancieres.length > 0){
      this.etape22.ressourcesFinancieres.forEach(ressourcesFinanciere => {
        this.addFinancial(ressourcesFinanciere.name,ressourcesFinanciere.fondateur,ressourcesFinanciere.description,ressourcesFinanciere.disponibilite);
      })
    }
    else {this.addFinancial('','','','');
    }

    if(this.etape22.ressourcesImmaterielles.length > 0){
      this.etape22.ressourcesImmaterielles.forEach(ressourcesImmaterielle => {
        this.addImmaterielle(ressourcesImmaterielle.name,ressourcesImmaterielle.fondateur,ressourcesImmaterielle.description,ressourcesImmaterielle.disponibilite);
      })
    }
    else {this.addImmaterielle('','','','');
    }
    if(this.etape22.besoins.length > 0){
      this.etape22.besoins.forEach(besoin => {
        this.addBesoin(besoin.nom,besoin.type,besoin.importance,besoin.recurrence);
      })
    }
    else {this.addBesoin('','','','');
    }
    if(this.etape22.acteurs.length > 0){
      this.etape22.acteurs.forEach(acteur => {
        this.addActor(acteur.nom,acteur.classement,acteur.analyse,acteur.niveauInteretInfluence);
      })
    }
    else {this.addActor('','','','');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();

  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape2.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = (this.etape22.project.coaches) && (this.etape22.project.coaches.map((user) => user.id).includes(this.user.id))
    if (this.isEditable) {
      this.startTimer();
    }
  }

  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      this.save()
      this.toastr.success('Changes in Business Environment are saved Successfully.');
    }
    return of(true);
  }

  startTimer(): void {
    this.subscriptions.add(
      interval(30000).pipe(
        debounceTime(3000)
      ).subscribe(() => this.save())
    );
  }

  newfieldtable(): FormArray {
    return this.etape2.get("newfieldtable") as FormArray
}

  newnewfieldtable(name: string, value: String): FormGroup {
    return this.fb.group({
    nom: [name],
      valeur: [value]
    })
  }
  getnewfieldtableName(index: number): string {
    const newfieldtableFormGroup = this.newfieldtable().at(index) as FormGroup;
    const propertyName = Object.keys(newfieldtableFormGroup.controls)[0];
    return propertyName;
  }

  removenewfieldtable(i: number) {
    this.newfieldtable().removeAt(i);
  }

  addnewField() {
  const newFieldName = this.etape2.get('newField')?.value;
  this.newfieldtable().push(this.newnewfieldtable(newFieldName,''));
  this.etape2.get('newField')?.reset();
}
    /************** */

    Financial(): FormArray {
      return this.etape2.get("Financial") as FormArray
    }

  newFinancial(name: string, fondateur: string, description: string, disponibilite: string): FormGroup {
    return this.fb.group({
      name: name,
      fondateur: fondateur,
      description: description,
      disponibilite: disponibilite
    })
  }

  addFinancial(name:string,fondateur:string,description:string,disponibilite:string) {
    this.Financial().push(this.newFinancial(name, fondateur, description, disponibilite));
  }

  removeFinancial(i: number) {
    this.Financial().removeAt(i);
  }
  /************** */
  Material(): FormArray {
    return this.etape2.get("Material") as FormArray
  }

  newMaterial(name: string, fondateur: string, description: string, disponibilite: string): FormGroup {
    return this.fb.group({
      name: name,
      fondateur: fondateur,
      description: description,
      disponibilite: disponibilite
    })
  }

  addMaterial(name:string,fondateur:string,description:string,disponibilite:string) {
    this.Material().push(this.newMaterial(name, fondateur, description, disponibilite));
  }

  removeMaterial(i: number) {
    this.Material().removeAt(i);
  }
  /************** */
  Immaterielle(): FormArray {
    return this.etape2.get("Immaterielle") as FormArray
  }

  newImmaterielle(name: string, fondateur: string, description: string, disponibilite: string): FormGroup {
    return this.fb.group({
      name: name,
      fondateur: fondateur,
      description: description,
      disponibilite: disponibilite
    })
  }

  addImmaterielle(name:string,fondateur:string,description:string,disponibilite:string) {
    this.Immaterielle().push(this.newImmaterielle(name, fondateur, description, disponibilite));
  }

  removeImmaterielle(i: number) {
    this.Immaterielle().removeAt(i);
  }
  /******** Besoin *******************
   *
  */
  Besoin(): FormArray {
    return this.etape2.get("Besoin") as FormArray
  }

  newBesoin(name: string, type: string, importance: string, recurrence: string): FormGroup {
    return this.fb.group({
      nom: name,
      type: type,
      importance: importance,
      recurrence: recurrence
    })
  }

  addBesoin(name:string,type:string,importance:string,recurrence:string) {
    this.Besoin().push(this.newBesoin(name, type, importance, recurrence));
  }

  removeBesoin(i: number) {
    this.Besoin().removeAt(i);
  }
  /************* */
  Actor(): FormArray {
    return this.etape2.get("Actor") as FormArray
  }

  newActor(nom: string, classement: string, analyse: string, niveauInteretInfluence: string): FormGroup {
    return this.fb.group({
      nom: nom,
      classement: classement,
      analyse: analyse,
      niveauInteretInfluence: niveauInteretInfluence
    })
  }

  addActor(nom:string,classement:string,analyse:string,niveauInteretInfluence:string) {
    this.Actor().push(this.newActor(nom, classement, analyse, niveauInteretInfluence));
  }

  removeActor(i: number) {
    this.Actor().removeAt(i);
  }
  Cartographie: boolean = false;
  infoCartographie(){
    this.Cartographie=true;
  }
  save(){
    this.etape22.ressourcesFinancieres = this.etape2.get('Financial')?.value
    this.etape22.ressourcesMaterielles = this.etape2.get('Material')?.value
    this.etape22.ressourcesImmaterielles = this.etape2.get('Immaterielle')?.value
    this.etape22.besoins = this.etape2.get('Besoin')?.value
    this.etape22.champs = this.etape2.get('newfieldtable')?.value
    this.etape22.acteurs = this.etape2.get('Actor')?.value
    this.etape22 = { ...this.etape22, ...this.etape2.value };
    this.etape2Service.update(this.etape22)

  }
  onSubmit() {
    if(this.isEditable){
      this.save()
    }
    this.router.navigate(['/feed', 'etape', this.projectId, 3]);
  }
  rebrique:string=""
  showremarque: boolean = false;
  remarque(rebrique:string){
    this.showremarque=true
    this.rebrique=this.translate.instant(rebrique)
  }
  sendRemark(remarque:string){
    let newremarque:Remarque = new Remarque();
    newremarque.rubrique=this.rebrique
    newremarque.etapeId=this.etape22.id
    newremarque.remarque = remarque
    this.showremarque=false
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape22.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';

  }
  downloadPDF(){
      this.save()
      const filename = `${this.etape22.project.name} - Business Environement.pdf`;
      this.etape2Service.downloadPDF(this.projectId, filename);
  }
  downloadWord(){
    this.save()
    const filename = `${this.etape22.project.name} - Business Environement.docx`;
    this.etape2Service.downloadWord(this.projectId, filename);
  }
}
