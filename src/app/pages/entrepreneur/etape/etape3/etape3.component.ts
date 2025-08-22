import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, interval, Observable, of, Subscription} from 'rxjs';
import {Etape3} from 'src/app/Models/Etape3/Etape3';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {RemarkService} from 'src/app/services/Remark.service';
import {EditableService} from 'src/app/services/editable.service';
import {Etape3Service} from 'src/app/services/etape3.service';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-etape3',
  templateUrl: './etape3.component.html',
  styleUrls: ['./etape3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Etape3Component implements OnInit,CanComponentDeactivate {
  @ViewChild('remarqueTextarea') remarqueTextarea!: ElementRef;

  etape3: FormGroup;
    projectId:number=0
    etape33!:Etape3;
  selectedType = 'PDF';
    isEditable:boolean = false
    user:User=new User()
    private subscription: Subscription = new Subscription;
    private subscriptions: Subscription = new Subscription();
  canAddRemark!:boolean;
  videoUrl!: SafeResourceUrl;

  constructor(private translate: TranslateService, private remarkService: RemarkService, private toastr: ToastrService, private generatePDF: GeneratePdfService, private dataService: RemarkCharedDataService, private editableService: EditableService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private etape3Service: Etape3Service,private sanitizer: DomSanitizer) {
    this.translate.get('CONCEPT_VIDEO').subscribe((url: string) => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });

    this.subscriptions.add(
    this.activatedRoute.params.subscribe((params: Params) => {
      this.etape33 = activatedRoute.snapshot.data["etape3"];
      this.projectId = params['id'];
    }));
    this.dataService.sendData(this.etape33.remarques)

    this.etape3 = this.fb.group({
      id: this.etape33.id,
      partenaires: this.etape33?.partenaires,
      activites: this.etape33?.activites,
      ressources: this.etape33?.ressources,
      valeurs: this.etape33?.valeurs,
      relations: this.etape33?.relations,
      distribution: this.etape33?.distribution,
      clienteles: this.etape33?.clienteles,
      couts: this.etape33?.couts,
      revenus: this.etape33?.revenus,
  })

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape3.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = (this.etape33.project.coaches) && (this.etape33.project.coaches.map((user) => user.id).includes(this.user.id))
    if (this.isEditable) {
      this.startTimer();
    }
  }

  startTimer(): void {
    this.subscriptions.add(
      interval(30000).pipe(
        debounceTime(3000)
      ).subscribe(() => this.save())
    );
  }

  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      this.save()
      this.toastr.success('Changes in The Concept Development are saved Successfully.');
    }
    return of(true);
  }

  idea: boolean = false;
  infoidea(){
    this.idea=true;
  }
  generateBMC(){
    this.router.navigate(['/feed', 'bmcview', this.projectId]);
  }

  save(){
    this.etape33 = { ...this.etape33, ...this.etape3.value };
    this.etape3Service.update(this.etape33)
  }

  onSubmit() {
    if(this.isEditable){
      this.save()
    }
    this.router.navigate(['/feed','etape',this.projectId,4]);
  }
  showremarque: boolean = false;

  rebrique:string=""
  remarque(rebrique:string){
    this.showremarque=true
    this.rebrique=this.translate.instant(rebrique)
  }
  sendRemark(remarque:string){
    let newremarque:Remarque = new Remarque();
    newremarque.rubrique=this.rebrique
    newremarque.etapeId=this.etape33.id
    newremarque.user.nom=this.user.nom + ' '+ this.user.prenom
    newremarque.remarque = remarque
    newremarque.user.nom=this.user.nom + ' '+ this.user.prenom
    this.showremarque=false
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape33.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';

  }
  downloadPDF(){
    const filename = `${this.etape33.project.name} - The Concept Development.pdf`;
    this.etape3Service.downloadPDF(this.projectId, filename);
  }
  downloadWord(){

    const filename = `${this.etape33.project.name} - The Concept Development.docx`;
    this.etape3Service.downloadWord(this.projectId, filename);
  }
}
