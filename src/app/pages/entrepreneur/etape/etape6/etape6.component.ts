import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, debounceTime, forkJoin, from, interval, map, Observable, of, pipe, Subscription, switchMap, tap} from 'rxjs';
import {Etape5} from 'src/app/Models/Etape5/Etape5';
import {Etape6} from 'src/app/Models/Etape6/Etape6';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {RemarkService} from 'src/app/services/Remark.service';
import {EditableService} from 'src/app/services/editable.service';
import {Etape5Service} from 'src/app/services/etape5.service';
import {Etape6Service} from 'src/app/services/etape6.service';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-etape6',
  templateUrl: './etape6.component.html',
  styleUrls: ['./etape6.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class Etape6Component implements OnInit,CanComponentDeactivate {
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
    return index; 
  }
  cumulativeTotalFond: number = 0;
  DepreciationTotalYear1: number = 0;
  DepreciationTotalYear2: number = 0;
  DepreciationTotalYear3: number = 0;
  DepreciationTotalYear4: number = 0;
  DepreciationTotalYear5: number = 0;

  etape6: FormGroup;
  etape5: FormGroup;
  projectId:number=0
  etape66!:Etape6
  etape55!:Etape5
  selectedType = 'PDF';
  cumulativeTotal:number
  isEditable:boolean = false
  user:User=new User()
  private subscriptions: Subscription = new Subscription();

  canAddRemark!:boolean
  totalYear1=0;
  totalYear2=0;
  totalYear3=0;
  totalYear4=0;
  totalYear5=0;

  videoUrl!: SafeResourceUrl;

  constructor(private etape5Service: Etape5Service, private translate: TranslateService, private remarkService: RemarkService, private toastr: ToastrService, private generatePDF: GeneratePdfService, private dataService: RemarkCharedDataService, private editableService: EditableService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private etape6Service: Etape6Service,private sanitizer: DomSanitizer) {
    this.translate.get('FINANCIAL_VIDEO').subscribe((url: string) => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });


    this.subscriptions.add(
    this.activatedRoute.params.subscribe((params: Params) => {
        this.etape66 = activatedRoute.snapshot.data["etape6"];
        this.etape55 = activatedRoute.snapshot.data["etape5"];
        this.projectId = params['id'];
        console.log("mochkol fil get!",this.etape55.infrastructures);

    }));
    this.dataService.sendData(this.etape66.remarques)
    this.cumulativeTotal = this.etape66 ? this.etape66.chargesTotal : 0;
    this.etape5 = this.fb.group({
      id:this.etape55.id,
      fonds: this.fb.array([
      ]),
      infrastructures: this.fb.array([
      ]),
    })
    this.etape6 = this.fb.group({
      id:this.etape66.id,
      premieres: this.fb.array([
      ]),
      services: this.fb.array([
      ]),
      personnels: this.fb.array([
      ]),
      entretiens: this.fb.array([
      ]),
      augmentation:this.etape66.augmentation ==0? 25:this.etape66.augmentation,
      chargesTotal1: this.etape66.chargesTotal1,
      chargesTotal2: this.etape66.chargesTotal2,
      chargesTotal3: this.etape66.chargesTotal3,
      chargesTotal4: this.etape66.chargesTotal4,
      chargesTotal5: this.etape66.chargesTotal5,
      rbe1: this.etape66.rbe1,
      rbe2: this.etape66.rbe2,
      rbe3: this.etape66.rbe3,
      rbe4: this.etape66.rbe4,
      rbe5: this.etape66.rbe5,
      frais2: this.etape66.frais2,
      frais: this.etape66.frais,
      frais3: this.etape66.frais3,
      frais4: this.etape66.frais4,
      frais5: this.etape66.frais5,
      beneficeBrut1: this.etape66.beneficeBrut1,
      beneficeBrut2: this.etape66.beneficeBrut2,
      beneficeBrut3: this.etape66.beneficeBrut3,
      beneficeBrut4: this.etape66.beneficeBrut4,
      beneficeBrut5: this.etape66.beneficeBrut5,
      impot1: this.etape66.impot1,
      impot2: this.etape66.impot2,
      impot3: this.etape66.impot3,
      impot4: this.etape66.impot4,
      impot5: this.etape66.impot5,
      beneficeNet1: this.etape66.beneficeNet1,
      beneficeNet2: this.etape66.beneficeNet2,
      beneficeNet3: this.etape66.beneficeNet3,
      beneficeNet4: this.etape66.beneficeNet4,
      beneficeNet5: this.etape66.beneficeNet5,
      amortissement1: {value:this.etape66.amortissement1,disabled: true},
      amortissement2: {value:this.etape66.amortissement1,disabled: true},
      amortissement3: {value:this.etape66.amortissement1,disabled: true},
      amortissement4: {value:this.etape66.amortissement1,disabled: true},
      amortissement5: {value:this.etape66.amortissement1,disabled: true},
      chiffreAffaire1: this.etape66.cumulativeTotal,
      chiffreAffaire2: this.etape66.chiffreAffaire2,
      chiffreAffaire3: this.etape66.chiffreAffaire3,
      chiffreAffaire4: this.etape66.chiffreAffaire4,
      chiffreAffaire5: this.etape66.chiffreAffaire5,
      cumulativeTotal: this.etape66.cumulativeTotal,
      justification: this.etape66.justification,
      taxes:this.etape66.taxes,
    });

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
        const anualTotal1 =parseFloat(((fond.prix*fond.quantite*12)/divided).toFixed(3));
        const anualTotal2 = parseFloat((anualTotal1 - (anualTotal1 * fond.augYear2 / 100)).toFixed(3));
        const anualTotal3 = parseFloat((anualTotal2 - (anualTotal2* fond.augYear3 / 100)).toFixed(3));
        const anualTotal4 = parseFloat((anualTotal3 - (anualTotal3* fond.augYear4 / 100)).toFixed(3));  
        const anualTotal5 = parseFloat((anualTotal4 - (anualTotal4* fond.augYear5 / 100)).toFixed(3));
        this.totalYear1 = parseFloat((this.totalYear1 + anualTotal1).toFixed(3));
        this.totalYear2 = parseFloat((this.totalYear2 + anualTotal2).toFixed(3));
        this.totalYear3 = parseFloat((this.totalYear3 + anualTotal3).toFixed(3));
        this.totalYear4 = parseFloat((this.totalYear4 + anualTotal4).toFixed(3));
        this.totalYear5 = parseFloat((this.totalYear5 + anualTotal5).toFixed(3));
        if(fond.workingCapital){
          const tot=(fond.prix*fond.quantite*this.etape55.periodDeFonds)/divided
          console.log(tot)
          this.addfond(fond.element,fond.type,fond.quantite,fond.prix,parseFloat(((fond.prix*fond.quantite*this.etape55.periodDeFonds)/divided).toFixed(3)),fond.periodicity,fond.workingCapital,anualTotal1,anualTotal2,anualTotal4,anualTotal4,anualTotal5,fond.augYear2,fond.augYear3,fond.augYear4,fond.augYear5);
          this.cumulativeTotalFond = parseFloat((this.cumulativeTotalFond+(fond.prix*fond.quantite*12)/divided).toFixed(3));

        }else{
          this.addfond(fond.element,fond.type,fond.quantite,fond.prix,0,fond.periodicity,fond.workingCapital,anualTotal1,anualTotal2,anualTotal3,anualTotal4,anualTotal5,fond.augYear2,fond.augYear3,fond.augYear4,fond.augYear5);
        }
      })
    }



    else {this.addfond('','',0,0,0,'',false,0,0,0,0,0,0,0,0,0);
    }


    if(this.etape55.infrastructures.length > 0){
      this.etape55.infrastructures.forEach(infrastructure => {
        this.addinfrastructure(infrastructure.element,infrastructure.type,infrastructure.quantite,infrastructure.prix,infrastructure.fournisseur,infrastructure.prix*infrastructure.quantite,infrastructure.nbOfYears,infrastructure.depreciationYear1,infrastructure.depreciationYear2,infrastructure.depreciationYear3,infrastructure.depreciationYear4,infrastructure.depreciationYear5);
        this.calculateTotalDepreciation()
      })
    }
  }
  roundToThreeDecimals(value: number): number {
    return Math.round(value * 1000) / 1000;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape6.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = (this.etape66.project.coaches) && (this.etape66.project.coaches.map((user) => user.id).includes(this.user.id))
    if (this.isEditable) {
      this.startTimer();
    }
  }



  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      return this.save().pipe(
        tap(() => {
          this.toastr.success('Changes in Financial Study are saved Successfully.');
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

  startTimer(): void {
    this.subscriptions.add(
      interval(30000).pipe(
        debounceTime(3000)
      ).subscribe(() => this.onSaveClick())
    );
  }

  /*********infrastructure************ */
  infrastructure(): FormArray {
    return this.etape5.get("infrastructures") as FormArray
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
  updateDepreciation(index: number) {
    const product = this.infrastructure().at(index);
    const nbOfYears = product.get('nbOfYears')?.value || 0;
    const total = product.get('total')?.value|| 0;
    var depreciationYear1=0;
    var depreciationYear2=0;
    var depreciationYear3=0;
    var depreciationYear4=0;
    var depreciationYear5=0;
    if(nbOfYears>=1){
      depreciationYear1 = parseFloat((total / nbOfYears).toFixed(3));
    }if(nbOfYears>=2){
      depreciationYear2 = parseFloat((total / nbOfYears).toFixed(3));
    }if(nbOfYears>=3){
      depreciationYear3 = parseFloat((total / nbOfYears).toFixed(3));
    }if(nbOfYears>=4){
      depreciationYear4 = parseFloat((total / nbOfYears).toFixed(3));
    }if(nbOfYears>=5){
      depreciationYear5 = parseFloat((total / nbOfYears).toFixed(3));
    }
    product.patchValue({
      depreciationYear1: depreciationYear1,
      depreciationYear2: depreciationYear2,
      depreciationYear3: depreciationYear3,
      depreciationYear4: depreciationYear4,
      depreciationYear5: depreciationYear5
    });
    this.calculateTotalDepreciation();
  }
  calculateTotalDepreciation(){
    this.DepreciationTotalYear1 = 0;
    this.DepreciationTotalYear2 = 0;
    this.DepreciationTotalYear3 = 0;
    this.DepreciationTotalYear4 = 0;
    this.DepreciationTotalYear5 = 0;
    const infrastructureArray = this.etape5.get('infrastructures') as FormArray;
    infrastructureArray.controls.forEach((infrastructure, index) => {
      const product = this.infrastructure().at(index);
      const depreciationYear1 = product.get('depreciationYear1')?.value|| 0;
      const depreciationYear2 = product.get('depreciationYear2')?.value|| 0;
      const depreciationYear3 = product.get('depreciationYear3')?.value|| 0;
      const depreciationYear4 = product.get('depreciationYear4')?.value|| 0;
      const depreciationYear5 = product.get('depreciationYear5')?.value|| 0;
      this.DepreciationTotalYear1 += depreciationYear1;
      this.DepreciationTotalYear2 += depreciationYear2;
      this.DepreciationTotalYear3 += depreciationYear3;
      this.DepreciationTotalYear4 += depreciationYear4;
      this.DepreciationTotalYear5 += depreciationYear5;
    })
    this.etape6.get('amortissement1')?.setValue(this.DepreciationTotalYear1);
    this.etape6.get('amortissement2')?.setValue(this.DepreciationTotalYear2);
    this.etape6.get('amortissement3')?.setValue(this.DepreciationTotalYear3);
    this.etape6.get('amortissement4')?.setValue(this.DepreciationTotalYear4);
    this.etape6.get('amortissement5')?.setValue(this.DepreciationTotalYear5);
  }

       /*********fond************ */
       fond(): FormArray {
         return this.etape5.get("fonds") as FormArray
       }

  newfond(element: String, type: String, quantite: number, prix: number, total: number, periodicity: string, workingCapital: Boolean, annualTotal: number,annualTotal2:number,annualTotal3:number,annualTotal4:number,annualTotal5:number,augYear2:number,augYear3:number,augYear4:number,augYear5:number): FormGroup {
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
      augYear5:augYear5,
      annualTotal2:{value: annualTotal2, disabled:true},
      annualTotal3:{value: annualTotal3, disabled:true},
      annualTotal4:{value: annualTotal4, disabled:true},
      annualTotal5:{value: annualTotal5, disabled:true}

    })
  }
  addfond(element:String,type:String,quantite:number,prix:number,total:number,periodicity:string,workingCapital:Boolean,annualTotal:number,annualTotal2:number,annualTotal3:number,annualTotal4:number,annualTotal5:number,augYear2:number,augYear3:number,augYear4:number,augYear5:number) {
    this.fond().push(this.newfond(element, type, quantite, prix, total, periodicity, workingCapital, annualTotal, annualTotal2, annualTotal3, annualTotal4, annualTotal5,augYear2,augYear3,augYear4,augYear5));
  }

  removefond(i: number) {
    const product = this.fond().at(i);
    const prix = product.get('prix')?.value || 0;
    const quantite = product.get('quantite')?.value || 0;
    const periodicity = product.get('periodicity')?.value || 0;
    var divided=1
    switch (periodicity) {
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
    const oldTotal=parseFloat(((prix*quantite*12)/divided).toFixed(3))
    this.cumulativeTotalFond=this.cumulativeTotalFond- oldTotal
    this.fond().removeAt(i);
  }

  updateTotalFond(index: number) {
    const product = this.fond().at(index);
    const prix = product.get('prix')?.value;
    const quantite = product.get('quantite')?.value;
    const periodicity = product.get('periodicity')?.value;
    const workingCapital = product.get('workingCapital')?.value;
    const augYear2 = product.get('augYear2')?.value;
    const augYear3 = product.get('augYear3')?.value;
    const augYear4 = product.get('augYear4')?.value;
    const augYear5 = product.get('augYear5')?.value;
    const periodDeFondsp: number = this.etape55.periodDeFonds;
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
            newTotal = parseFloat(((prix * quantite * periodDeFondsp)*coef).toFixed(3));
            newAnnualTotal = parseFloat((prix * quantite * 12).toFixed(3)) ;
            break;
    }
    const anualTotal2 = parseFloat((newAnnualTotal - (newAnnualTotal* augYear2 / 100)).toFixed(3));
    const anualTotal3 = parseFloat((anualTotal2 - (anualTotal2* augYear3 / 100)).toFixed(3));
    const anualTotal4 = parseFloat((anualTotal3 - (anualTotal3* augYear4 / 100)).toFixed(3));
    const anualTotal5 = parseFloat((anualTotal4 - (anualTotal4* augYear5 / 100)).toFixed(3));
    product.patchValue({
      total: newTotal,
      annualTotal: newAnnualTotal,
      annualTotal2: anualTotal2,
      annualTotal3: anualTotal3,
      annualTotal4: anualTotal4,
      annualTotal5: anualTotal5
    });
    this.updateWorkingCapital()
  }

  updateWorkingCapital() {
    this.cumulativeTotalFond = 0;
    this.totalYear1=0;
    this.totalYear2=0;
    this.totalYear3=0;
    this.totalYear4=0;
    this.totalYear5=0;
    const fondArray = this.etape5.get('fonds') as FormArray;
    fondArray.controls.forEach((fond, index) => {
      const product = this.fond().at(index);
      const prix = product.get('prix')?.value || 0;
      const quantite = product.get('quantite')?.value || 0;
      const periodicity = product.get('periodicity')?.value || 0;
      var divided=1
      switch (periodicity) {
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
      const oldTotal=parseFloat(((prix*quantite*12)/divided).toFixed(3))
      this.cumulativeTotalFond += oldTotal;
      this.totalYear1 = parseFloat((this.totalYear1 + (product.get('annualTotal')?.value || 0)).toFixed(3));
      this.totalYear2 = parseFloat((this.totalYear2 + (product.get('annualTotal2')?.value || 0)).toFixed(3));
      this.totalYear3 = parseFloat((this.totalYear3 + (product.get('annualTotal3')?.value || 0)).toFixed(3));
      this.totalYear4 = parseFloat((this.totalYear4 + (product.get('annualTotal4')?.value || 0)).toFixed(3));
      this.totalYear5 = parseFloat((this.totalYear5 + (product.get('annualTotal5')?.value || 0)).toFixed(3));
    })

  }
  updateAllFond(){
    const fondArray = this.etape5.get('fonds') as FormArray;
    fondArray.controls.forEach((fond, index) => {
      this.updateTotalFond(index)
    })
  }



  Charges: boolean = false;
  infoCharges(){
    this.Charges=true
  }
  updateTotal(index: number, type:String) {
    let field: any
    //chiffre d'affiare
    //this.etape6.get('chiffreAffaire1')?.setValue(this.etape6.get('cumulativeTotal'))//njib chiffre d'affiare mel etape5
    this.etape6.get('chiffreAffaire2')?.setValue(parseFloat((this.etape6.get('chiffreAffaire1')?.value * this.etape6.get('augmentation')?.value / 100 || 0).toFixed(3)))
    this.etape6.get('chiffreAffaire3')?.setValue(parseFloat((this.etape6.get('chiffreAffaire2')?.value * this.etape6.get('augmentation')?.value / 100 || 0).toFixed(3)))
    this.etape6.get('chiffreAffaire4')?.setValue(parseFloat((this.etape6.get('chiffreAffaire3')?.value * this.etape6.get('augmentation')?.value / 100|| 0).toFixed(3)))
    this.etape6.get('chiffreAffaire5')?.setValue(parseFloat((this.etape6.get('chiffreAffaire4')?.value * this.etape6.get('augmentation')?.value / 100 || 0).toFixed(3)))
    //charges
    this.etape6.get('chargesTotal1')?.setValue(this.cumulativeTotal)
    this.etape6.get('chargesTotal2')?.setValue(parseFloat((this.etape6.get('chargesTotal1')?.value * this.etape6.get('augmentation')?.value / 100|| 0).toFixed(3)))
    this.etape6.get('chargesTotal3')?.setValue(parseFloat((this.etape6.get('chargesTotal2')?.value * this.etape6.get('augmentation')?.value / 100|| 0).toFixed(3)))
    this.etape6.get('chargesTotal4')?.setValue(parseFloat((this.etape6.get('chargesTotal3')?.value * this.etape6.get('augmentation')?.value / 100|| 0).toFixed(3)))
    this.etape6.get('chargesTotal5')?.setValue(parseFloat((this.etape6.get('chargesTotal4')?.value * this.etape6.get('augmentation')?.value / 100|| 0).toFixed(3)))
    //rbe
    this.etape6.get('rbe1')?.setValue(parseFloat((this.etape6.get('chiffreAffaire1')?.value - this.etape6.get('chargesTotal1')?.value || 0).toFixed(3)))
    this.etape6.get('rbe2')?.setValue(parseFloat((this.etape6.get('chiffreAffaire2')?.value - this.etape6.get('chargesTotal2')?.value || 0).toFixed(3)))
    this.etape6.get('rbe3')?.setValue(parseFloat((this.etape6.get('chiffreAffaire3')?.value - this.etape6.get('chargesTotal3')?.value || 0).toFixed(3)))
    this.etape6.get('rbe4')?.setValue(parseFloat((this.etape6.get('chiffreAffaire4')?.value - this.etape6.get('chargesTotal4')?.value || 0).toFixed(3)))
    this.etape6.get('rbe5')?.setValue(parseFloat((this.etape6.get('chiffreAffaire5')?.value - this.etape6.get('chargesTotal5')?.value || 0).toFixed(3)))
    //frais
    this.etape6.get('frais1')?.setValue(this.etape6.get('frais')?.value)
    this.etape6.get('frais2')?.setValue(parseFloat((this.etape6.get('frais1')?.value * this.etape6.get('augmentation')?.value / 100 || 0).toFixed(3)))
    this.etape6.get('frais3')?.setValue(parseFloat((this.etape6.get('frais2')?.value * this.etape6.get('augmentation')?.value / 100 || 0).toFixed(3)))
    this.etape6.get('frais4')?.setValue(parseFloat((this.etape6.get('frais3')?.value * this.etape6.get('augmentation')?.value / 100 || 0).toFixed(3)))
    this.etape6.get('frais5')?.setValue(parseFloat((this.etape6.get('frais4')?.value * this.etape6.get('augmentation')?.value / 100 || 0).toFixed(3)))
    //beneficeBrut1
    this.etape6.get('beneficeBrut1')?.setValue(parseFloat((this.etape6.get('rbe1')?.value-this.etape6.get('frais1')?.value-this.etape6.get('amortissement1')?.value || 0).toFixed(3)))
    this.etape6.get('beneficeBrut2')?.setValue(parseFloat((this.etape6.get('rbe2')?.value-this.etape6.get('frais2')?.value-this.etape6.get('amortissement2')?.value || 0).toFixed(3)))
    this.etape6.get('beneficeBrut3')?.setValue(parseFloat((this.etape6.get('rbe3')?.value-this.etape6.get('frais3')?.value-this.etape6.get('amortissement3')?.value || 0).toFixed(3)))
    this.etape6.get('beneficeBrut4')?.setValue(parseFloat((this.etape6.get('rbe4')?.value-this.etape6.get('frais4')?.value-this.etape6.get('amortissement4')?.value || 0).toFixed(3)))
    this.etape6.get('beneficeBrut5')?.setValue(parseFloat((this.etape6.get('rbe5')?.value-this.etape6.get('frais5')?.value-this.etape6.get('amortissement5')?.value || 0).toFixed(3)))
    //impot
    this.etape6.get('impot1')?.setValue(parseFloat((this.etape6.get('beneficeBrut1')?.value * this.etape6.get('taxes')?.value /100 || 0).toFixed(3)))
    this.etape6.get('impot2')?.setValue(parseFloat((this.etape6.get('beneficeBrut2')?.value * this.etape6.get('taxes')?.value /100 || 0).toFixed(3)))
    this.etape6.get('impot3')?.setValue(parseFloat((this.etape6.get('beneficeBrut3')?.value * this.etape6.get('taxes')?.value /100 || 0).toFixed(3)))
    this.etape6.get('impot4')?.setValue(parseFloat((this.etape6.get('beneficeBrut4')?.value * this.etape6.get('taxes')?.value /100 || 0 ).toFixed(3)))
    this.etape6.get('impot5')?.setValue(parseFloat((this.etape6.get('beneficeBrut5')?.value * this.etape6.get('taxes')?.value /100 || 0).toFixed(3)))
    //beneficeNet
    this.etape6.get('beneficeNet1')?.setValue(parseFloat((this.etape6.get('beneficeBrut1')?.value - this.etape6.get('impot1')?.value || 0).toFixed(3)))
    this.etape6.get('beneficeNet2')?.setValue(parseFloat((this.etape6.get('beneficeBrut2')?.value - this.etape6.get('impot2')?.value || 0).toFixed(3)))
    this.etape6.get('beneficeNet3')?.setValue(parseFloat((this.etape6.get('beneficeBrut3')?.value - this.etape6.get('impot3')?.value || 0).toFixed(3)))
    this.etape6.get('beneficeNet4')?.setValue(parseFloat((this.etape6.get('beneficeBrut4')?.value - this.etape6.get('impot4')?.value || 0 ).toFixed(3)))
    this.etape6.get('beneficeNet5')?.setValue(parseFloat((this.etape6.get('beneficeBrut5')?.value - this.etape6.get('impot5')?.value || 0).toFixed(3)))
  }

  save(): any {
    this.etape66.chargesTotal = this.cumulativeTotalFond;
    this.etape66 = {...this.etape66, ...this.etape6.value};
    this.etape55.infrastructures = this.etape5.get('infrastructures')?.value;
    this.etape55.fonds = this.etape5.get('fonds')?.value;
    console.log("mochkol fil update!",this.etape55.infrastructures);
    return forkJoin([
      this.etape5Service.update(this.etape55),
      this.etape6Service.update(this.etape66)
    ]);
  }
  onSaveClick(): void {
    if (this.isEditable) {
      this.save().pipe(
        tap(() => {
          this.toastr.success('Changes in Financial Study are saved Successfully.');
        }),
        catchError((error) => {
          this.toastr.error('Failed to save changes.');
          return of(error); 
        })
      ).subscribe();
    }
  }

  onSubmit() {
    if(this.isEditable){
      this.onSaveClick()
    }
    this.router.navigate(['/feed','etape',this.projectId,7]);
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
    newremarque.etapeId=this.etape66.id
    newremarque.remarque = remarque
    newremarque.user.nom=this.user.nom + ' '+ this.user.prenom
    this.showremarque=false
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape66.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';

  }
  downloadPDF(){
    this.subscriptions.add(this.save().subscribe(() => {
      const filename = `${this.etape66.project.name} - Financial Study.pdf`;
      this.etape6Service.downloadPDF(this.projectId, filename);
    }));

  }
  downloadWord(){
    this.subscriptions.add(this.save().subscribe(() => {
      const filename = `${this.etape66.project.name} - Financial Study.docx`;
      this.etape6Service.downloadWord(this.projectId, filename);
    }));

  }
}
