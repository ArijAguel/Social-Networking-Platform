import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, interval, Observable, of, Subscription} from 'rxjs';
import {Etape4} from 'src/app/Models/Etape4/Etape4';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {RemarkService} from 'src/app/services/Remark.service';
import {EditableService} from 'src/app/services/editable.service';
import {Etape4Service} from 'src/app/services/etape4.service';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-etape4',
  templateUrl: './etape4.component.html',
  styleUrls: ['./etape4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Etape4Component implements OnInit ,CanComponentDeactivate{
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
  etape4: FormGroup;
    projectId:number=0
    etape44!:Etape4;
    selectedType = 'PDF';
    cumulativeTotal: number;
    isEditable:boolean = false
    user:User=new User()
    private subscriptions: Subscription = new Subscription();
  canAddRemark!:boolean;
  videoUrls: SafeResourceUrl[] = [];

  constructor(private translate: TranslateService, private remarkService: RemarkService, private toastr: ToastrService, private generatePDF: GeneratePdfService, private dataService: RemarkCharedDataService, private editableService: EditableService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private etape4Service: Etape4Service,private sanitizer: DomSanitizer) {
    this.translate.get(['ANALYSIS_VIDEO', 'STRATEGY_VIDEO', 'IMPLEMENTATION_VIDEO', 'SALES_VIDEO']).subscribe((urls: any) => {
      this.videoUrls = Object.values(urls).map((url) =>
        this.sanitizer.bypassSecurityTrustResourceUrl(url as string)
      );
    });    

    this.subscriptions.add(
    this.activatedRoute.params.subscribe((params: Params) => {
      this.etape44 = activatedRoute.snapshot.data["etape4"];
        this.projectId = params['id'];
    }));
    this.dataService.sendData(this.etape44.remarques)
    this.etape4 = this.fb.group({
      id: this.etape44.id,
      descriptionProduit: this.etape44.descriptionProduit,
      marcheCible: this.etape44.marcheCible,
      politiquePrix: this.etape44.politiquePrix,
      forces: this.etape44.forces,
      faiblesses: this.etape44.faiblesses,
      opportunites: this.etape44.opportunites,
      menaces: this.etape44.menaces,
      quelImpact:this.etape44.quelImpact,
      pestel : this.fb.array([
        this.newpestel('Political',this.etape44?.pestel.find(champ => champ.axe === 'Political')?.forces || '',this.etape44?.pestel.find(champ => champ.axe === 'Political')?.faiblesses || ''),
        this.newpestel('Economic',this.etape44?.pestel.find(champ => champ.axe === 'Economic')?.forces || '',this.etape44?.pestel.find(champ => champ.axe === 'Economic')?.faiblesses || ''),
        this.newpestel('Social',this.etape44?.pestel.find(champ => champ.axe === 'Social')?.forces || '',this.etape44?.pestel.find(champ => champ.axe === 'Social')?.faiblesses || ''),
        this.newpestel('Technological',this.etape44?.pestel.find(champ => champ.axe === 'Technological')?.forces || '',this.etape44?.pestel.find(champ => champ.axe === 'Technological')?.faiblesses || ''),
        this.newpestel('Environmental',this.etape44?.pestel.find(champ => champ.axe === 'Environmental')?.forces || '',this.etape44?.pestel.find(champ => champ.axe === 'Environmental')?.faiblesses || ''),
        this.newpestel('Legal',this.etape44?.pestel.find(champ => champ.axe === 'Legal')?.forces || '',this.etape44?.pestel.find(champ => champ.axe === 'Legal')?.faiblesses || '')
      ]),

      positionnement: this.etape44.positionnement,
      concurrentiel: this.etape44.concurrentiel,
      oppMenaces: this.etape44.oppMenaces,
      size: this.etape44.size,
      advantages: this.etape44.advantages,
      positioning: this.etape44.positioning,
      product: this.etape44.product,
      price: this.etape44.price,
      place: this.etape44.place,
      promotion: this.etape44.promotion,
      people: this.etape44.people,
      process: this.etape44.process,
      physical: this.etape44.physical,
      objectifMarketing:this.etape44.objectifMarketing ,
      longTerme: this.etape44.longTerme,
      demarche: this.etape44.demarche,
      smart: this.etape44.smart,
      action: this.etape44.action,
      realisable: this.etape44.realisable,
      cumulativeTotal: this.etape44.cumulativeTotal,
      produit:this.fb.array([
      ]),
      comptitors:this.fb.array([
      ]),
      marketings:this.fb.array([
      ]),
      marketingobjectivs:this.fb.array([
      ]),
  })
      this.cumulativeTotal = this.etape44 ? this.etape44.cumulativeTotal : 0;

  if(this.etape44.produits.length > 0){
      this.etape44.produits.forEach(produit => {
        this.addProduit(produit.nom,produit.prix,produit.quantite,produit.total);
      })
      this.calculeAnnualTurnover()
    }
    else {this.addProduit('',0,0,0);
    }
    if(this.etape44.competitors.length > 0){
      this.etape44.competitors.forEach(comptitor => {
        this.addComptitor(comptitor.comptitor,comptitor.type,comptitor.marketShare,comptitor.strategicPositioning,comptitor.pricing,comptitor.strengths,comptitor.weaknesses);
      })
    }
    else {this.addComptitor('','','','',0,'','');
    }
    if(this.etape44.marketings.length > 0){
      this.etape44.marketings.forEach(marketing => {
        this.addMarketing(marketing.action,marketing.responsables,marketing.resources,marketing.budget,marketing.deadline,marketing.kpis);
      })
    }
    else {this.addMarketing('','','','','','');
    }
    if(this.etape44.marketingobjectivs.length > 0){
      this.etape44.marketingobjectivs.forEach(marketing => {
        this.addMarketingObjectivs(marketing.objectivs,marketing.deadline);
      })
    }
    else {this.addMarketingObjectivs('',new Date());
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape4.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = (this.etape44.project.coaches) && (this.etape44.project.coaches.map((user) => user.id).includes(this.user.id))
    if (this.isEditable) {
      this.startTimer();
    }
  }


  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      this.save()
      this.toastr.success('Changes in Market Study are saved Successfully.');
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

  pestel(): FormArray {
    return this.etape4.get("pestel") as FormArray
  }

  newpestel(object: String, forces: String, faiblesses: String): FormGroup {
    return this.fb.group({
      axe: object,
      forces: forces,
      faiblesses: faiblesses,
    })
  }
  Preliminary : boolean = false;
  infoPreliminary (){
    this.Preliminary =true;
  }
   Plan : boolean = false;
  infoPlan (){
    this.Plan =true;
  }
   products  : boolean = false;
  infoproducts  (){
    this.products  =true;
  }

  Produit(): FormArray {
    return this.etape4.get("produit") as FormArray
  }

  newProduit(nom: String, prix: number, quantite: number, total: number): FormGroup {
    return this.fb.group({
      nom: nom,
      prix: prix,
      quantite:quantite,
      total:{value: total, disabled:true}
    })
  }

  addProduit(nom:String,prix:number,quantite:number,total:number) {
    this.Produit().push(this.newProduit(nom, prix, quantite, total));
  }

  removeProduit(i:number) {
    const product = this.Produit().at(i);
    const oldTotal = product.get('total')?.value || 0;
    this.Produit().removeAt(i);
    this.calculeAnnualTurnover()
  }
  /****************** comptitor ************ */
  Comptitor(): FormArray {
    return this.etape4.get("comptitors") as FormArray
  }

  newComptitor(comptitor: String, type: String, marketShare: String, strategicPositioning: String, pricing: number, strengths: String, weaknesses: String): FormGroup {
    return this.fb.group({
      comptitor: comptitor,
      type: type,
      marketShare:marketShare,
      strategicPositioning:strategicPositioning,
      pricing:pricing,
      strengths:strengths,
      weaknesses:weaknesses,
    })
  }

  addComptitor(comptitor:String,type:String,marketShare:String,strategicPositioning:String,pricing:number,strengths:String,weaknesses:String) {
    this.Comptitor().push(this.newComptitor(comptitor, type, marketShare, strategicPositioning, pricing, strengths, weaknesses));
  }

  removeComptitor(i:number) {
    this.Comptitor().removeAt(i);
  }

  /****************** MarketingObjectivs ************ */
  MarketingObjectivs(): FormArray {
    return this.etape4.get("marketingobjectivs") as FormArray
  }

  newMarketingObjectivs(objectivs: String, deadline: Date): FormGroup {
    return this.fb.group({
      objectivs: objectivs,
      deadline: deadline,
    })
  }

  addMarketingObjectivs(objectivs:String,deadline:Date=new Date()) {
    this.MarketingObjectivs().push(this.newMarketingObjectivs(objectivs, deadline));
  }

  removeMarketingObjectivs(i:number) {
    this.MarketingObjectivs().removeAt(i);
  }
/****************** marketing ************ */
Marketing(): FormArray {
  return this.etape4.get("marketings") as FormArray
}

  newMarketing(action: String, responsables: String, resources: String, budget: String, deadline: String, kpis: String): FormGroup {
    return this.fb.group({
      action: action,
      responsables: responsables,
      resources:resources,
      budget:budget,
      deadline:deadline,
      kpis:kpis,
    })
  }

  addMarketing(action:String,responsables:String,resources:String,budget:String,deadline:String,kpis:String) {
    this.Marketing().push(this.newMarketing(action, responsables, resources, budget, deadline, kpis));
  }

  removeMarketing(i:number) {
    this.Marketing().removeAt(i);
  }

  updateTotal(index: number) {
    const product = this.Produit().at(index);
    const prix = product.get('prix')?.value;
    const quantite = product.get('quantite')?.value;
    product.patchValue({
      total: prix * quantite
    });
    this.calculeAnnualTurnover()
    }
    calculeAnnualTurnover(){
      this.cumulativeTotal=0;
      this.Produit().controls.forEach(element => {
        this.cumulativeTotal+=element.get('prix')?.value*element.get('quantite')?.value||0;
      });
    }
  save(){
    this.etape44.cumulativeTotal = this.cumulativeTotal
    this.etape44.competitors=this.etape4.get('comptitors')?.value
    this.etape44.produits=this.etape4.get('produit')?.value
    this.etape44 = { ...this.etape44, ...this.etape4.value };
    this.etape4Service.update(this.etape44)
  }
  onSubmit() {
    if(this.isEditable){
      this.save()
    }
    this.router.navigate(['/feed', 'etape', this.projectId, 5]);
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
    newremarque.etapeId=this.etape44.id
    newremarque.remarque = remarque
    newremarque.user.nom=this.user.nom + ' '+ this.user.prenom
    this.showremarque=false
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape44.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';

  }
  downloadPDF(){
      this.save()
      const filename = `${this.etape44.project.name} - Market Study.pdf`;
      this.etape4Service.downloadPDF(this.projectId, filename);
  }
  downloadWord(){
    this.save()
    const filename = `${this.etape44.project.name} - Market Study.docx`;
    this.etape4Service.downloadWord(this.projectId, filename);
  }
}
