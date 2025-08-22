import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, debounceTime, forkJoin, interval, map, Observable, of, Subscription, switchMap, tap} from 'rxjs';
import {Etape5} from 'src/app/Models/Etape5/Etape5';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {RemarkService} from 'src/app/services/Remark.service';
import {EditableService} from 'src/app/services/editable.service';
import {Etape5Service} from 'src/app/services/etape5.service';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-etape5',
  templateUrl: './etape5.component.html',
  styleUrls: ['./etape5.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Etape5Component  implements OnInit,CanComponentDeactivate{
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
  canAddRemark!:boolean
  isOpen(index: number) {
    return this.openIndexes.includes(index);
  }
  trackById(index: number, item: AbstractControl): string {
    return item.get('id')?.value; // Track by unique ID
  }
  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      return this.save().pipe(
        tap(() => {
          this.toastr.success('Changes in Technical Study are saved Successfully.');
        }),
        map(() => true),
        catchError((error) => {
          this.toastr.error('Failed to save changes.');
          return of(true); 
        })
      );
    }
    return of(true);
  }

  etape5: FormGroup;
  projectId:number=0
  etape55!:Etape5
  selectedType = 'PDF';
  total1:number  = 0
  total2  : number = 0
  cumulativeTotal :number  = 0;
  cumulativeTotalFond: number = 0;
  isEditable: boolean = false
  divers: number;
  user: User = new User()

  sumLand:number=0
  sumFacilities:number=0
  sumFitout	:number=0
  sumEquipment:number=0
  sumTransportation:number=0
  sumLandFurniture :number=0
  sumTechnology:number=0
  private subscriptions: Subscription = new Subscription();
  videoUrl!: SafeResourceUrl;

  constructor(private translate: TranslateService, private remarkService:RemarkService,private toastr: ToastrService,private generatePDF:GeneratePdfService,private dataService: RemarkCharedDataService,private editableService:EditableService,private fb:FormBuilder,private activatedRoute:ActivatedRoute,private router: Router,private etape5Service: Etape5Service,private sanitizer: DomSanitizer) {
    this.translate.get('TECHNICAL_VIDEO').subscribe((url: string) => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
    
    this.subscriptions.add(
    this.activatedRoute.params.subscribe((params: Params) => {
      this.etape55 = activatedRoute.snapshot.data["etape5"];
      this.projectId = params['id'];
    }));

    this.dataService.sendData(this.etape55.remarques)

    this.total1 = 0
    this.etape5 = this.fb.group({
      id:this.etape55.id,
      fournisseurs: this.fb.array([
      ]),
      partenaires: this.fb.array([
      ]),
      infrastructures: this.fb.array([
      ]),
      periodDeFonds:this.etape55.periodDeFonds ==0? 12:this.etape55.periodDeFonds,
      fonds: this.fb.array([
      ]),
      productService: this.etape55.productService,
      process: this.etape55.process,
      quality: this.etape55.quality,
      humanResources: this.etape55.humanResources,
      resourceRequirements: this.etape55.resourceRequirements,
      supplyChain: this.etape55.supplyChain,
      risqueManagement: this.etape55.risqueManagement,
      timelineMileStone: this.etape55.timelineMileStone,
      compliance: this.etape55.compliance,
      fraisEtablissement: this.etape55.fraisEtablissement,
      terrain: this.etape55.terrain,
      genieCivil: this.etape55.genieCivil,
      elementIncorporels: this.etape55.elementIncorporels,
      amenagement: this.etape55.amenagement,
      equipementProduction: this.etape55.equipementProduction,
      materielTransport: this.etape55.materielTransport,
      mobilier: this.etape55.mobilier,
      divers: this.etape55.divers,
      fondRoulement: this.etape55.fondRoulement,
      capital: this.etape55.capital,
      promoteur: this.etape55.promoteur,
      foprodi: this.etape55.foprodi,
      ownerCapital: this.etape55.ownerCapital,
    });
    this.total2 = (this.etape55 ? this.etape55.promoteur : 0) +(this.etape55 ? this.etape55.foprodi : 0) +(this.etape55 ? this.etape55.ownerCapital : 0)
    console.log(this.etape55)
    console.log(this.total2)

    if(this.etape55.fournisseurs.length > 0){
      this.etape55.fournisseurs.forEach(fournisseur => {
        this.addfournisseur(fournisseur.fournisseur,fournisseur.teste,fournisseur.pointsFort,fournisseur.pointsFaible,fournisseur.decision);
      })
    }
    else {this.addfournisseur('',false,'','','');
    }

    if(this.etape55.partenaires.length > 0){
      this.etape55.partenaires.forEach(partenaire => {
        this.addpartenaire(partenaire.partenaire,partenaire.teste,partenaire.pointsForts,partenaire.pointsFaibles,partenaire.decision);
      })
    }
    else {this.addpartenaire('',false,'','','');
    }

    if(this.etape55.infrastructures.length > 0){
      this.etape55.infrastructures.forEach(infrastructure => {
        this.addinfrastructure(infrastructure.element,infrastructure.type,infrastructure.quantite,infrastructure.prix,infrastructure.fournisseur,infrastructure.prix*infrastructure.quantite,infrastructure.nbOfYears,infrastructure.depreciationYear1,infrastructure.depreciationYear2,infrastructure.depreciationYear3,infrastructure.depreciationYear4,infrastructure.depreciationYear5);
        this.cumulativeTotal = this.cumulativeTotal+infrastructure.prix*infrastructure.quantite
        if(infrastructure.type === 'Land'){
          this.sumLand=this.sumLand+infrastructure.prix*infrastructure.quantite
        }else if(infrastructure.type === 'Facilities'){
          this.sumFacilities=this.sumFacilities+infrastructure.prix*infrastructure.quantite
        }else if(infrastructure.type === 'Fit-out'){
          this.sumFitout=this.sumFitout+infrastructure.prix*infrastructure.quantite
        }else if(infrastructure.type === 'Equipement'){
          this.sumEquipment=this.sumEquipment+infrastructure.prix*infrastructure.quantite
        }else if(infrastructure.type === 'Transportation'){
          this.sumTransportation=this.sumTransportation+infrastructure.prix*infrastructure.quantite
        }else if(infrastructure.type === 'Furniture and office equipment'){
          this.sumLandFurniture=this.sumLandFurniture+infrastructure.prix*infrastructure.quantite
        }else if(infrastructure.type === 'Technology'){
          this.sumTechnology=this.sumTechnology+infrastructure.prix*infrastructure.quantite
        }
        this.etape5.patchValue({
          fraisEtablissement:this.sumLand,
          genieCivil:this.sumFitout,
          terrain:this.sumFacilities,
          amenagement:this.sumTransportation,
          elementIncorporels:this.sumEquipment,
          equipementProduction:this.sumLandFurniture,
          materielTransport:this.sumTechnology,
        })
      this.calculateTotals()

      })
    }
    else {this.addinfrastructure('','',0,0,'',0,0,0,0,0,0,0);
    }
    if(this.etape55.fonds.length > 0){
      this.etape55.fonds.forEach(fond => {
        let divided=1
        switch (fond.periodicity) {
        case 'Every 1 month':
            divided= 1;
            break;
        case 'Every 2 month':
            divided= 2;
            break;
        case 'Every 3 month':
            divided= 3;
            break;
        case 'Every 4 month':
            divided= 4;
            break;
        case 'Every 6 month':
            divided= 6;
            break;
        case 'Every 12 month':
            divided= 12;
            break;
        default:
            divided=1;
            break;
        }
        if(fond.workingCapital){
          this.addfond(fond.element,fond.type,fond.quantite,fond.prix,parseFloat(((fond.prix*fond.quantite*this.etape5.get("periodDeFonds")?.value)/divided).toFixed(3)),fond.periodicity,fond.workingCapital,parseFloat(((fond.prix*fond.quantite*12)/divided).toFixed(3)),fond.augYear2,fond.augYear3,fond.augYear4,fond.augYear5);
          this.cumulativeTotalFond = this.cumulativeTotalFond+parseFloat(((fond.prix*fond.quantite*this.etape5.get("periodDeFonds")?.value)/divided).toFixed(3));
          this.total1=this.total1+this.cumulativeTotalFond
        }else{
          this.addfond(fond.element,fond.type,fond.quantite,fond.prix,0,fond.periodicity,fond.workingCapital,parseFloat(((fond.prix*fond.quantite*12)/divided).toFixed(3)),fond.augYear2,fond.augYear3,fond.augYear4,fond.augYear5);
        }
      })
      this.calculateTotals()
    }
    else {this.addfond('','',0,0,0,'',false,0,0,0,0,0);
    }
    this.divers=(parseFloat(this.etape5.get('equipementProduction')?.value) || 0) /10
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape5.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = (this.etape55.project.coaches) && (this.etape55.project.coaches.map((user) => user.id).includes(this.user.id))
    if (this.isEditable) {
      this.startTimer();
    }
  }



  startTimer(): void {
    /*this.subscriptions.add(
      interval(30000).pipe(
        debounceTime(3000)
      ).subscribe(() => this.onSaveClick())
    );*/
  }

    /*********fournisseur************ */
    fournisseur(): FormArray {
      return this.etape5.get("fournisseurs") as FormArray
    }

  newfournisseur(fournisseur: String, teste: boolean, pointsFort: String, pointsFaible: String, decision: String): FormGroup {
    return this.fb.group({
      fournisseur: fournisseur,
      teste: teste,
      pointsFort: pointsFort,
      pointsFaible: pointsFaible,
      decision: decision
    })
  }
  addfournisseur(fournisseur:String,teste:boolean,pointsFort:String,pointsFaible:String,decision:String) {
    this.fournisseur().push(this.newfournisseur(fournisseur, teste, pointsFort, pointsFaible, decision));
  }


  removefournisseur(i: number) {
    this.fournisseur().removeAt(i);
  }
      /*********partenaire************ */
      partenaire(): FormArray {
        return this.etape5.get("partenaires") as FormArray
      }

  newpartenaire(partenaire: String, teste: boolean, pointsFort: String, pointsFaible: String, decision: String): FormGroup {
    return this.fb.group({
      partenaire: partenaire,
      teste: teste,
      pointsForts: pointsFort,
      pointsFaibles: pointsFaible,
      decision: decision
    })
  }

  addpartenaire(partenaire:String,teste:boolean,pointsFort:String,pointsFaible:String,decision:String) {
    this.partenaire().push(this.newpartenaire(partenaire, teste, pointsFort, pointsFaible, decision));
  }

  removepartenaire(i: number) {
    this.partenaire().removeAt(i);
  }

  /*********infrastructure************ */
  infrastructure(): FormArray {
    return this.etape5.get('infrastructures') as FormArray;
  }


  newinfrastructure(element: String, type: String, quantite: number, prix: number, fournisseur: string, total: number, nbOfYears: number, depreciationYear1: number, depreciationYear2: number, depreciationYear3: number, depreciationYear4: number, depreciationYear5: number): FormGroup {
    return this.fb.group({
      element: element,
      type: type,
      quantite: quantite,
      prix: prix,
      fournisseur:fournisseur,
      nbOfYears:nbOfYears,
      depreciationYear1:depreciationYear1,
      depreciationYear2:depreciationYear2,
      depreciationYear3:depreciationYear3,
      depreciationYear4:depreciationYear4,
      depreciationYear5:depreciationYear5,
      total:{value: total, disabled:true}
    })
  }
  addinfrastructure(element:String,type:String,quantite:number,prix:number,fournisseur:string,total:number,nbOfYears:number,depreciationYear1:number,depreciationYear2:number,depreciationYear3:number,depreciationYear4:number,depreciationYear5:number) {
    this.infrastructure().push(this.newinfrastructure(element, type, quantite, prix, fournisseur, total, nbOfYears, depreciationYear1, depreciationYear2, depreciationYear3, depreciationYear4, depreciationYear5));
  }


  removeinfrastructure(i: number) {
    const control = this.infrastructure();
    const product = control.at(i);

    if (i >= 0 && i < control.length) { 
      control.removeAt(i);

      const oldTotal = product.get('total')?.value || 0;
  
      this.cumulativeTotal -= oldTotal;
  
      const type = product.get('type')?.value;
      switch (type) {
        case 'Land':
          this.sumLand -= oldTotal;
          break;
        case 'Facilities':
          this.sumFacilities -= oldTotal;
          break;
        case 'Fit-out':
          this.sumFitout -= oldTotal;
          break;
        case 'Equipement':
          this.sumEquipment -= oldTotal;
          break;
        case 'Transportation':
          this.sumTransportation -= oldTotal;
          break;
        case 'Furniture and office equipment':
          this.sumLandFurniture -= oldTotal;
          break;
        case 'Technology':
          this.sumTechnology -= oldTotal;
          break;
      }
  
      this.etape5.patchValue({
        fraisEtablissement: this.sumLand,
        genieCivil: this.sumFitout,
        terrain: this.sumFacilities,
        amenagement: this.sumTransportation,
        elementIncorporels: this.sumEquipment,
        equipementProduction: this.sumLandFurniture,
        materielTransport: this.sumTechnology,
      });
  
      this.calculateTotals();
    }
  }
  
    updateTotal(index: number) {
      const product = this.infrastructure().at(index);
      const prix = product.get('prix')?.value;
      const quantite = product.get('quantite')?.value;
      const oldTotal = product.get('total')?.value || 0;
      const newTotal = prix * quantite;
      const totalChange = newTotal - oldTotal;
      product.patchValue({
        total: newTotal
      });
      this.cumulativeTotal=this.cumulativeTotal+totalChange
      if(product.get('type')?.value === 'Land'){
            this.sumLand=this.sumLand+totalChange
          }else if(product.get('type')?.value === 'Facilities'){
            this.sumFacilities=this.sumFacilities+totalChange
          }else if(product.get('type')?.value === 'Fit-out'){
            this.sumFitout=this.sumFitout+totalChange
          }else if(product.get('type')?.value === 'Equipement'){
            this.sumEquipment=this.sumEquipment+totalChange
          }else if(product.get('type')?.value === 'Transportation'){
            this.sumTransportation=this.sumTransportation+totalChange
          }else if(product.get('type')?.value === 'Furniture and office equipment'){
            this.sumLandFurniture=this.sumLandFurniture+totalChange
          }else if(product.get('type')?.value === 'Technology'){
            this.sumTechnology=this.sumTechnology+totalChange
          }
          this.etape5.patchValue({
            fraisEtablissement:this.sumLand,
            genieCivil:this.sumFitout,
            terrain:this.sumFacilities,
            amenagement:this.sumTransportation,
            elementIncorporels:this.sumEquipment,
            equipementProduction:this.sumLandFurniture,
            materielTransport:this.sumTechnology,
          })
      this.calculateTotals()
    }
       /*********fond************ */
       fond(): FormArray {
         return this.etape5.get("fonds") as FormArray
       }

  newfond(element: String, type: String, quantite: number, prix: number, total: number, periodicity: string, workingCapital: Boolean, annualTotal: number, augYear2:number,augYear3:number,augYear4:number,augYear5:number): FormGroup {
    return this.fb.group({
      element: element,
      type: type,
      quantite:quantite,
      prix: prix,
      periodicity:periodicity,
      annualTotal:{value: annualTotal, disabled:true},
      workingCapital:workingCapital,
      total:{value: total, disabled:true},
      augYear2:augYear2,
      augYear3:augYear3,
      augYear4:augYear4,
      augYear5:augYear5
    })
  }
  addfond(element:String,type:String,quantite:number,prix:number,total:number,periodicity:string,workingCapital:Boolean,annualTotal:number, augYear2:number,augYear3:number,augYear4:number,augYear5:number) {
    this.fond().push(this.newfond(element, type, quantite, prix, total, periodicity, workingCapital, annualTotal,augYear2,augYear3,augYear4,augYear5));
  }

  removefond(i: number) {
    const product = this.fond().at(i);
    const oldTotal = product.get('total')?.value || 0;

    this.cumulativeTotalFond=this.cumulativeTotalFond- oldTotal
    this.fond().removeAt(i);
  }

  updateTotalFond(index: number) {
    const product = this.fond().at(index);
    const prix = product.get('prix')?.value;
    const quantite = product.get('quantite')?.value;
    const periodicity = product.get('periodicity')?.value;
    const workingCapital = product.get('workingCapital')?.value;
    const periodDeFondsp: number = this.etape5.get("periodDeFonds")?.value||0;
    let  newTotal
    let newAnnualTotal
    let coef
    if(workingCapital){
      coef=1
    }else{
      coef=0
    }
    switch (periodicity) {
        case 'Every 1 month':
            newTotal = ((prix * quantite * periodDeFondsp) / 1)*coef;
            newAnnualTotal = (prix * quantite * 12) / 1;
            break;
        case 'Every 2 month':
            newTotal = ((prix * quantite * periodDeFondsp) / 2)*coef;
            newAnnualTotal = (prix * quantite * 12) / 2;
            break;
        case 'Every 3 month':
            newTotal = ((prix * quantite * periodDeFondsp) / 3)*coef;
            newAnnualTotal = (prix * quantite * 12) / 3;
            break;
        case 'Every 4 month':
            newTotal = ((prix * quantite * periodDeFondsp) / 4)*coef;
            newAnnualTotal = (prix * quantite * 12) / 4;
            break;
        case 'Every 6 month':
            newTotal = ((prix * quantite * periodDeFondsp) / 6)*coef;
            newAnnualTotal = (prix * quantite * 12) / 6;
            break;
        case 'Every 12 month':
            newTotal = ((prix * quantite * periodDeFondsp) / 12)*coef;
            newAnnualTotal = (prix * quantite * 12) / 12;
            break;
        default:
            newTotal = (prix * quantite * periodDeFondsp)*coef;
            newAnnualTotal = (prix * quantite * 12) ;
            break;
    }
    product.patchValue({
      total: parseFloat(newTotal.toFixed(3)),
      annualTotal: parseFloat(newAnnualTotal.toFixed(3))
    });
    this.updateWorkingCapital()
    this.calculateTotals()
  }
  updateWorkingCapital() {
    this.cumulativeTotalFond = 0;
    const fondArray = this.etape5.get('fonds') as FormArray;
    fondArray.controls.forEach((fond, index) => {
      const product = this.fond().at(index);
      const workingCapital = product.get('workingCapital')?.value;
      const oldTotal = product.get('total')?.value || 0;
      if(workingCapital){
        this.cumulativeTotalFond += oldTotal;
      }
    })

  }
  updateAllFond(){
    const fondArray = this.etape5.get('fonds') as FormArray;
    fondArray.controls.forEach((fond, index) => {
      this.updateTotalFond(index)
    })
  }
  calculateTotals() {
    // Calculate total1
    this.divers=(parseFloat(this.etape5.get('equipementProduction')?.value)/10 || 0)
    this.total1 =
      this.cumulativeTotalFond+
      (parseFloat(this.etape5.get('fraisEtablissement')?.value) || 0) +
      (parseFloat(this.etape5.get('genieCivil')?.value) || 0) +
      (parseFloat(this.etape5.get('terrain')?.value) || 0) +
      (parseFloat(this.etape5.get('elementIncorporels')?.value) || 0) +
      (parseFloat(this.etape5.get('amenagement')?.value) || 0) +
      (parseFloat(this.etape5.get('equipementProduction')?.value) || 0) +
      (parseFloat(this.etape5.get('materielTransport')?.value) || 0) +
      this.divers    
  }
  calculateTotal2(){
    this.total2 =
      (parseFloat(this.etape5.get('promoteur')?.value) || 0) +
      (parseFloat(this.etape5.get('foprodi')?.value) || 0)+
      (parseFloat(this.etape5.get('ownerCapital')?.value) || 0)
  }




  suppliers: boolean = false;
  infosuppliers(){
    this.suppliers=true
  }
  onSaveClick(): void {
    if (this.isEditable) {
      this.save().pipe(
        tap(() => {
          this.toastr.success('Changes in Technical Study are saved Successfully.');
        }),
        catchError((error) => {
          this.toastr.error('Failed to save changes.');
          return of(error); 
        })
      ).subscribe(); // <--- Add subscribe() here
    }
  }

  save(): Observable<any> {
    this.etape55.mobilier = this.total1;
    this.etape55.capital = this.cumulativeTotalFond;
    this.etape55.fondRoulement = this.cumulativeTotalFond;
    this.etape55.periodDeFonds = this.etape5.get("periodDeFonds")?.value;
    this.etape55 = {...this.etape55, ...this.etape5.value};
    return this.etape5Service.update(this.etape55);
  }

  onSubmit() {
    if(this.isEditable){
      this.onSaveClick()
    }
    this.router.navigate(['/feed', 'etape', this.projectId, 6]);
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
    newremarque.etapeId=this.etape55.id
    newremarque.remarque = remarque
    newremarque.user.nom=this.user.nom + ' '+ this.user.prenom
    this.showremarque=false
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape55.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';

  }
  downloadPDF(){
    this.subscriptions.add(this.save().subscribe(() => {
      const filename = `${this.etape55.project.name} - Technical Study.pdf`;
      this.etape5Service.downloadPDF(this.projectId, filename);
    }));

  }
  downloadWord(){
    
    this.subscriptions.add(this.save().subscribe(() => {
      const filename = `${this.etape55.project.name} - Technical Study.docx`;
      this.etape5Service.downloadWord(this.projectId, filename);
    }));
  }
}
