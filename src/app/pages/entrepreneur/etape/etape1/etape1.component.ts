import {ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Etape1} from 'src/app/Models/Etape1/Etape1';
import {User} from 'src/app/Models/User';
import {EditableService} from 'src/app/services/editable.service';
import {Etape1Service} from 'src/app/services/etape1.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {getItem} from 'src/app/utils/localStorage';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {debounceTime, interval, Observable, of, Subscription} from 'rxjs';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {ToastrService} from 'ngx-toastr';
import {RemarkService} from 'src/app/services/Remark.service';
import {Remarque} from 'src/app/Models/Remarque';
import {TranslateService} from '@ngx-translate/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// import { IStepOption, TourService } from 'ngx-ui-tour-md-menu';

@Component({
  selector: 'app-etape1',
  templateUrl: './etape1.component.html',
  styleUrls: ['./etape1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Etape1Component implements OnInit,CanComponentDeactivate, OnDestroy  {
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
  private subscriptions: Subscription = new Subscription();
  etape1: FormGroup;
  etape11:Etape1;
  projectId:number=0
  isEditable!:boolean
  canAddRemark!:boolean
  selectedType = 'PDF';
  user:User=new User()
  private subscription: Subscription = new Subscription;
  videoUrls: SafeResourceUrl[] = [];

  // on boarding guide tour
  // public readonly tourService = inject(TourService);
  // readonly tourSteps: IStepOption[] = [
  //   {
  //     anchorId: 'pdf',
  //     content: 'Download the PDF document here.',
  //     title: 'Download Pdf',
  //     enableBackdrop: true,
  //   },
  //   {
  //     anchorId: 'word',
  //     content: 'Download the Word document here.',
  //     title: 'Download Word',
  //     enableBackdrop: true,
  //   },
  //   {
  //     anchorId: 'save',
  //     content: 'Save your changes here.',
  //     title: 'Save',
  //     enableBackdrop: true,
  //   }, 
  //   {
  //     anchorId: 'remarks',
  //     content: 'Add your professional remarks here.',
  //     title: 'Professionals remarks',
  //     enableBackdrop: true,
  //   },  
  //   {
  //     anchorId: 'assistance',
  //     content: 'Get professional assistance here.',
  //     title: 'Professional assistance',
  //     enableBackdrop: true,
  //   },   
  // ]

  constructor(private translate: TranslateService, private remarkService:RemarkService,private toastr: ToastrService,private generatePDF:GeneratePdfService,private dataService: RemarkCharedDataService,private editableService:EditableService,private fb:FormBuilder, private etape1Service: Etape1Service,private activatedRoute:ActivatedRoute,private router: Router,private sanitizer: DomSanitizer) {

    this.translate.get(['VISION_VIDEO', 'MISSION_VIDEO', 'VALUES_VIDEO', 'GOALS_VIDEO']).subscribe((urls: any) => {
      this.videoUrls = Object.values(urls).map((url) =>
        this.sanitizer.bypassSecurityTrustResourceUrl(url as string)
      );
    });

    this.etape11 = activatedRoute.snapshot.data["etape1"];
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.projectId = params['id'];
      })
    );
      this.dataService.sendData(this.etape11.remarques)
    this.etape1 = this.fb.group({
      id: this.etape11.id,
      situationActuelle: this.etape11.situationActuelle,
      avantages: this.etape11.avantages,
      defaillances: this.etape11.defaillances,
      tendanceEnvironnement:this.etape11.tendanceEnvironnement,
      vision:this.etape11.vision,
      ressources:this.etape11.ressources,
      lois: this.etape11.lois,
      axes: this.etape11.axes,
      nomMission:this.etape11.nomMission,
      competences:this.etape11.competences,
      concordance:this.etape11.concordance,
      impact: this.etape11.impact,
      activite:this.etape11.activite,
      materialize:this.etape11.materialize,
      lives:this.etape11.lives,
      ambitious:this.etape11.ambitious,
      beneficiares: this.fb.array([
      ]),
      monitoring:this.fb.array([
      ]),
      valeurs:this.fb.array([
      ]),
      objectif: this.fb.array([])
    });

    if(this.etape11.beneficiares.length > 0){
      this.etape11.beneficiares.forEach(beneficiary => {
        this.addBeneficiary(beneficiary.cibles,beneficiary.objectifs,beneficiary.besoins);
      })
    }
    else{this.addBeneficiary('','','')}


    if(this.etape11.veilleGlobals.length > 0){
      this.etape11.veilleGlobals.forEach(veilleGlobal => {
        this.addMonitoring(veilleGlobal.entrepriseSimilaire,veilleGlobal.vision);
      })
    }
    else {this.addMonitoring('','');
    }


    if(this.etape11.valeurs.length > 0){
      this.etape11.valeurs.forEach(valeur => {
        this.addValeur(valeur.valeurProposee,valeur.importance);
      })
    }
    else {this.addValeur('','');
    }

    if(this.etape11.objectifs.length > 0){
      this.etape11.objectifs.forEach(objectif => {
        this.addObjectif(objectif.type,objectif.objectif,objectif.validation,objectif.changement);
      })
    }
    else {this.addObjectif('','','','');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape1.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = (this.etape11.project.coaches) && (this.etape11.project.coaches.map((user) => user.id).includes(this.user.id))
    if (this.isEditable) {
      this.startTimer();
    }

    // this.tourService.initialize(this.tourSteps, {});
    // this.startTour();
    // this.startTour();
    // setTimeout(() => {
    //   this.startTour();
    //  }, 100);
  }


  // startTour() {
  //   this.tourService.start();
  // }

  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      this.save()
      this.toastr.success('Changes in Business Fundamentals are saved Successfully.');
    }
    return of(true);
  }

  startTimer(): void {
    this.subscriptions.add(
      interval(30000).pipe(
        debounceTime(5000)
      ).subscribe(() => this.save())
    );
  }

    /*********beneficaire************ */
    beneficiary(): FormArray {
    return  this.etape1.get("beneficiares") as FormArray
    }

  newBeneficiary(cibles: string, objectifs: string, besoins: string): FormGroup {
    return this.fb.group({
      cibles: cibles,
      objectifs: objectifs,
      besoins: besoins
    })

  }
  addBeneficiary(cibles: string, objectifs: string, besoins: string) {
    this.beneficiary().push(this.newBeneficiary(cibles, objectifs, besoins));
  }

  removeBeneficiary(i: number) {
    this.beneficiary().removeAt(i);
  }
    /*********monitoring************ */
    monitoring(): FormArray {
      return this.etape1.get("monitoring") as FormArray
    }

  newMonitoring(entrepriseSimilaire: string, vision: string): FormGroup {
    return this.fb.group({
      entrepriseSimilaire: entrepriseSimilaire,
      vision: vision,
    })
  }

  addMonitoring(entrepriseSimilaire: string, vision: string) {
    this.monitoring().push(this.newMonitoring(entrepriseSimilaire, vision));
  }

  removeMonitoring(i: number) {
    this.monitoring().removeAt(i);
  }
  /*********valeur************ */
  valeur(): FormArray {
    return this.etape1.get("valeurs") as FormArray
  }

  newValeur(valeurProposee: string, importance: string): FormGroup {
    return this.fb.group({
      valeurProposee: valeurProposee,
      importance: importance,
    })
  }

  addValeur(valeurProposee: string,importance: string) {
    this.valeur().push(this.newValeur(valeurProposee, importance));
  }

  removeValeur(i: number) {
    this.valeur().removeAt(i);
  }
  /*********objectif************ */
  objectif(): FormArray {
    return this.etape1.get("objectif") as FormArray
  }

  newObjectif(type: string, objectif: string, validation: string, changement: string): FormGroup {
    return this.fb.group({
      type: type,
      objectif: objectif,
      validation:validation,
      changement:changement
    })
  }

  addObjectif(type: string, objectif: string,validation: string,changement: string) {
    this.objectif().push(this.newObjectif(type, objectif, validation, changement));
  }

  removeObjectif(i: number) {
    this.objectif().removeAt(i);
  }

  save(){
    this.etape11.veilleGlobals = this.etape1.get('monitoring')?.value
    this.etape11.objectifs = this.etape1.get('objectif')?.value
    this.etape11 = { ...this.etape11, ...this.etape1.value };
    this.etape1Service.update(this.etape11)
  }

  onSubmit() {
    if(this.isEditable){
      this.save()
    }
    this.router.navigate(['/feed', 'etape', this.projectId, 2]);
  }

  goal = false;
  vision: boolean = false;
  value: boolean = false;
  mission: boolean = false;

  infoGoals(){
    this.goal=true;
  }
  infoMission(){
    this.mission=true
  }
  infoVision(){
    this.vision=true
  }
  infoValue(){
    this.value=true
  }
  rebrique:string=""
  showremarque: boolean = false;
  remarque(rebrique:string){
    this.showremarque=true
    this.rebrique= this.translate.instant(rebrique)
  }
  sendRemark(remarque: string) {
    let newremarque: Remarque = {
      id: 0,  
      etapeId: this.etape11.id,
      rubrique: this.rebrique,
      remarque: remarque,
      etat: '',  
      raison: '', 
      myPost: false,  
      user: this.user,
    };
    
    this.showremarque = false;
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape11.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';
  }
  
 
  downloadPDF(){
      this.save()
      const filename = `${this.etape11.project.name} - Business Fundamentals.pdf`;
      this.etape1Service.downloadPDF(this.projectId, filename);
  }
  downloadWord(){
    this.save()
    const filename = `${this.etape11.project.name} - Business Fundamentals.docx`;
    this.etape1Service.downloadWord(this.projectId, filename);
  }

}
