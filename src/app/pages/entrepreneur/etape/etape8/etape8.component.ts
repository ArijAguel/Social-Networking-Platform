import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {debounceTime, interval, Observable, of, Subscription} from 'rxjs';
import {CanComponentDeactivate} from 'src/app/guards/CanComponentDeactivate.guard';
import {Etape8} from 'src/app/Models/Etape8/Etape8';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {EditableService} from 'src/app/services/editable.service';
import {Etape8Service} from 'src/app/services/etape8.service';
import {GeneratePdfService} from 'src/app/services/generate-pdf.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {RemarkService} from 'src/app/services/Remark.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-etape8',
  templateUrl: './etape8.component.html',
  styleUrls: ['./etape8.component.css']
})
export class Etape8Component implements OnInit,CanComponentDeactivate, OnDestroy   {
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
  etape8: FormGroup;
  etape88:Etape8;
  projectId:number=0
  isEditable!:boolean
  canAddRemark!:boolean
  selectedType = 'PDF';
  user:User=new User()
  private subscription: Subscription = new Subscription;

  constructor(private translate: TranslateService, private remarkService:RemarkService,private toastr: ToastrService,private generatePDF:GeneratePdfService,private dataService: RemarkCharedDataService,private editableService:EditableService,private fb:FormBuilder, private etape8Service: Etape8Service,private activatedRoute:ActivatedRoute,private router: Router) {
    this.etape88 = activatedRoute.snapshot.data["etape8"];
    this.subscriptions.add(
      this.activatedRoute.params.subscribe((params: Params) => {
        this.projectId = params['id'];
      })
    );
      this.dataService.sendData(this.etape88.remarques)
    this.etape8 = this.fb.group({
      id: this.etape88.id,
      organigrammeJuridique: [this.etape88.organigrammeJuridique],
      organigrammeJuridiqueLink: [this.etape88.organigrammeJuridiqueLink],
      statutsSocietes: [this.etape88.statutsSocietes],
      statutsSocietesLink: [this.etape88.statutsSocietesLink],
      certificatSociete: [this.etape88.certificatSociete],
      certificatSocieteLink: [this.etape88.certificatSocieteLink],
      membresOrganes: [this.etape88.membresOrganes],
      membresOrganesLink: [this.etape88.membresOrganesLink],
      comptesActionnaires: [this.etape88.comptesActionnaires],
      comptesActionnairesLink: [this.etape88.comptesActionnairesLink],
      tablecapitalisation: [this.etape88.tablecapitalisation],
      tablecapitalisationLink: [this.etape88.tablecapitalisationLink],
      liassesFiscales: [this.etape88.liassesFiscales],
      liassesFiscalesLink: [this.etape88.liassesFiscalesLink],
      matiereSocialFiscale: [this.etape88.matiereSocialFiscale],
      matiereSocialFiscaleLink: [this.etape88.matiereSocialFiscaleLink],
      informationsSociauxFiscaux: [this.etape88.informationsSociauxFiscaux],
      informationsSociauxFiscauxLink: [this.etape88.informationsSociauxFiscauxLink],
      comptesConsolides: [this.etape88.comptesConsolides],
      comptesConsolidesLink: [this.etape88.comptesConsolidesLink],
      compteBancaire: [this.etape88.compteBancaire],
      compteBancaireLink: [this.etape88.compteBancaireLink],
      dettesBancaire: [this.etape88.dettesBancaire],
      dettesBancaireLink: [this.etape88.dettesBancaireLink],
      detailsProvisions: [this.etape88.detailsProvisions],
      detailsProvisionsLink: [this.etape88.detailsProvisionsLink],
      creancesDouteuses: [this.etape88.creancesDouteuses],
      creancesDouteusesLink: [this.etape88.creancesDouteusesLink],
      elementsBudget: [this.etape88.elementsBudget],
      elementsBudgetLink: [this.etape88.elementsBudgetLink],
      businessPlan: [this.etape88.businessPlan],
      businessPlanLink: [this.etape88.businessPlanLink],
      descriptifsLitiges: [this.etape88.descriptifsLitiges],
      descriptifsLitigesLink: [this.etape88.descriptifsLitigesLink],
      conclusionsLitiges: [this.etape88.conclusionsLitiges],
      conclusionsLitigesLink: [this.etape88.conclusionsLitigesLink],
      client: [this.etape88.client],
      clientLink: [this.etape88.clientLink],
      partenairesFournisseurs: [this.etape88.partenairesFournisseurs],
      partenairesFournisseursPlanLink: [this.etape88.partenairesFournisseursPlanLink],
      autresContrats: [this.etape88.autresContrats],
      autresContratsLink: [this.etape88.autresContratsLink],
      bauxAnnexes: [this.etape88.bauxAnnexes],
      bauxAnnexesLink: [this.etape88.bauxAnnexesLink],
      accesPlateforme: [this.etape88.accesPlateforme],
      accesPlateformeLink: [this.etape88.accesPlateformeLink],
      routeProduit: [this.etape88.routeProduit],
      routeProduitLink: [this.etape88.routeProduitLink],
      demoProduit: [this.etape88.demoProduit],
      demoProduitLink: [this.etape88.demoProduitLink],
      enregistrementRenouvellement: [this.etape88.enregistrementRenouvellement],
      enregistrementRenouvellementLink: [this.etape88.enregistrementRenouvellementLink],
      accordsLicence: [this.etape88.accordsLicence],
      accordsLicenceLink: [this.etape88.accordsLicenceLink],
      fichesPaie: [this.etape88.fichesPaie],
      fichesPaieLink: [this.etape88.fichesPaieLink],
      preuveResidence: [this.etape88.preuveResidence],
      preuveResidenceLink: [this.etape88.preuveResidenceLink],
      organigramme: [this.etape88.organigramme],
      organigrammeLink: [this.etape88.organigrammeLink],
      contartAssurance: [this.etape88.contartAssurance],
      contartAssuranceLink: [this.etape88.contartAssuranceLink],
      conditionAssurance: [this.etape88.conditionAssurance],
      conditionAssuranceLink: [this.etape88.conditionAssuranceLink],
      nomsDomainesSites: [this.etape88.nomsDomainesSites],
      nomsDomainesSitesLink: [this.etape88.nomsDomainesSitesLink],
      systemesInformation: [this.etape88.systemesInformation],
      systemesInformationLink: [this.etape88.systemesInformationLink],
      licenseLogiciels: [this.etape88.licenseLogiciels],
      licenseLogicielsLink: [this.etape88.licenseLogicielsLink],
      plaquettesCommerciales: [this.etape88.plaquettesCommerciales],
      plaquettesCommercialesLink: [this.etape88.plaquettesCommercialesLink],
      donneesMarche: [this.etape88.donneesMarche],
      donneesMarcheLink: [this.etape88.donneesMarcheLink],
      CNIFondateurs: [this.etape88.CNIFondateurs],
      CNIFondateursLink: [this.etape88.CNIFondateursLink],
      CVExecCommittee: [this.etape88.CVExecCommittee],
      CVExecCommitteeLink: [this.etape88.CVExecCommitteeLink],
      TVAMensuelle: [this.etape88.TVAMensuelle],
      TVAMensuelleLink: [this.etape88.TVAMensuelleLink]
      });
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.isEditable = this.editableService.getIsEditable();
    if (!this.isEditable) {
      this.etape8.disable();
    }
    this.user = getItem('user')
    this.canAddRemark = ((this.etape88.project.coaches) && (this.etape88.project.coaches.map((user) => user.id).includes(this.user.id))) || ((this.etape88.project.investors.length > 0) && (this.etape88.project.investors.some(investor => investor.id === this.user.id)));
    if (this.isEditable) {
      this.startTimer();
    }
  }

  stopTimer(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  canDeactivate(): Observable<boolean> {
    if (this.isEditable) {
      this.save()
      this.toastr.success('Changes in Investment readiness are saved Successfully.');
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
  save(){
    this.etape88 = { ...this.etape88, ...this.etape8.value };
    this.etape8Service.update(this.etape88)
  }

  onSubmit() {
    if(this.isEditable){
      this.save()
    }
  }


  rebrique:string=""
  showremarque: boolean = false;
  remarque(rebrique:string){
    this.showremarque=true
    this.rebrique= this.translate.instant(rebrique)
  }
  sendRemark(remarque:string){
    let newremarque:Remarque = new Remarque();
    newremarque.rubrique=this.rebrique
    newremarque.etapeId=this.etape88.id
    newremarque.remarque = remarque
    newremarque.user.nom=this.user.nom + ' '+ this.user.prenom
    newremarque.myPost=true
    this.showremarque=false
    this.remarkService.create(newremarque);
    this.dataService.sendData(this.etape88.remarques.concat(newremarque));
    this.remarqueTextarea.nativeElement.value = '';

  }
  downloadPDF(){
      this.save()
      const filename = `${this.etape88.project.name} - Investment Readiness.pdf`;
      this.etape8Service.downloadPDF(this.projectId, filename);
  }
  downloadWord(){
    this.save()
    const filename = `${this.etape88.project.name} - Investment Readiness.docx`;
    this.etape8Service.downloadWord(this.projectId, filename);
  }


}
