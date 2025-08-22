import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, interval, Observable, of, Subscription} from 'rxjs';
import {Etape4} from 'src/app/Models/Etape4/Etape4';
import {Etape5} from 'src/app/Models/Etape5/Etape5';
import {Etape7} from 'src/app/Models/Etape7/Etape7';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {RemarkService} from 'src/app/services/Remark.service';
import {CoachService} from 'src/app/services/coach.service';
import {EditableService} from 'src/app/services/editable.service';
import {Etape7Service} from 'src/app/services/etape7.service';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-etape7',
  templateUrl: './etape7.component.html',
  styleUrls: ['./etape7.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Etape7Component implements OnInit,CanComponentDeactivate {
  @ViewChild('remarqueTextarea') remarqueTextarea!: ElementRef;

  etape7: FormGroup;
  projectId:number=0
  etape77!:Etape7
  etape55!:Etape5
  etape44!:Etape4
  selectedType = 'PDF';
  isEditable:boolean = false
  Openinfo: boolean = false;
  private subscriptions: Subscription = new Subscription();
  canAddRemark!:boolean;
  videoUrl!: SafeResourceUrl;

  info(){
    this.Openinfo=true
  }
    user:User=new User()
  submitWithoutNavigate: boolean = false;

  constructor(private translate: TranslateService, private remarkService: RemarkService, private toastr: ToastrService, private generatePDF: GeneratePdfService, private coachService: CoachService, private dataService: RemarkCharedDataService, private editableService: EditableService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private etape7Service: Etape7Service,private sanitizer: DomSanitizer) {
    this.translate.get('PROFILE_VIDEO').subscribe((url: string) => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.etape77 = activatedRoute.snapshot.data["etape7"];
        this.etape55 = activatedRoute.snapshot.data["etape5"];
        this.etape44 = activatedRoute.snapshot.data["etape4"];
        this.projectId = params['id'];
    }));
      this.dataService.sendData(this.etape77.remarques)

    this.etape7 = this.fb.group({
      id:this.etape77.id,
      nomEntreprise: {value:this.etape77.project.name,disabled:true},
      formeJuridique: this.etape77.formeJuridique,
      fondateurs: this.etape77.fondateurs,
      emplacements: this.etape77.emplacements,
      services: this.etape77.services,
      beneficaires: this.etape77.beneficaires,
      concurrents: this.etape77.concurrents,
      fournisseursPartenaires: this.etape77.fournisseursPartenaires,
      dateCreation:  this.etape77.dateCreation,
      entConcurrents:this.etape77.entConcurrents,
      coutInvestissement:  {value:this.etape55.mobilier,disabled:true},
      chiffreAffair:  {value:this.etape44.cumulativeTotal,disabled:true},
      nombreEmployeHomme:  this.etape77.nombreEmployeHomme,
      nombreEmployeFemme:  this.etape77.nombreEmployeFemme,
      nombreEmployeMoins35:  this.etape77.nombreEmployeMoins35,
      nombreSaisonnierHomme:  this.etape77.nombreSaisonnierHomme,
      nombreSaisonnierFemme:  this.etape77.nombreSaisonnierFemme,
      nombreSaisonnierMoins35:  this.etape77.nombreSaisonnierMoins35,
    });


  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape7.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = (this.etape77.project.coaches) && (this.etape77.project.coaches.map((user) => user.id).includes(this.user.id))

    if (this.isEditable) {
      this.startTimer();
    }

  }

  trackById(index: number, item: any): number {
    return index; // or item.id if your items have unique IDs
  }


  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      this.save()
      this.toastr.success('Changes in Company Profile are saved Successfully.');
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
  profile: boolean = false;
  infoprofile(){
    this.profile=true
  }
  coach: boolean = false;
  infoCoach(){
    this.coach=true
  }
  closeInfo() {
    this.Openinfo = false;
  }

  save(){
    this.etape77 = { ...this.etape77, ...this.etape7.value };
    this.etape7Service.update(this.etape77)
  }
  onSubmit() {
    if(this.isEditable){
      this.save()
    }
    this.router.navigate(['/feed/my-business']);
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
    newremarque.etapeId=this.etape77.id
    newremarque.remarque = remarque
    newremarque.user.nom=this.user.nom + ' '+ this.user.prenom
    this.showremarque=false
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape77.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';

  }
  downloadPDF(){
      this.save()
      const filename = `${this.etape77.project.name} - Company profile.pdf`;
      this.etape7Service.downloadPDF(this.projectId, filename);
  }
  downloadWord(){
    this.save()
    const filename = `${this.etape77.project.name} - Company profile.docx`;
    this.etape7Service.downloadWord(this.projectId, filename);
  }
}
