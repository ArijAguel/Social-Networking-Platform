import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserApiService} from "../../api/user-api.service";
import {AuthenticationService} from "../../services/authentication.service";
import {CoachApiService} from "../../api/coach-api.service";
import {ToastrService} from "ngx-toastr";
import {InvestisseurApiService} from "../../api/investisseur-api.service";
import {Observable} from "rxjs";
import {User} from "../../Models/User";
import {Router} from "@angular/router";
import {Investisseur} from "../../Models/investisseur";
import {Coach} from "../../Models/Coach";
import {UserService} from "../../services/user.service";
import {getItem, setItem} from "../../utils/localStorage";
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {TranslationService} from 'src/app/services/translation.service';
import {Countries} from 'src/app/Models/Countries';
import {countries} from 'src/app/utils/countriesData';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  investisseur = new Investisseur();
  coach = new Coach();

  roleModal: boolean = false;
  roleContenu = '';

  openRoleModal(type: string): void {
    this.getAllCountries();
    this.userService.hasPermission(type === 'Professional' ? 'DEVENIR_PROFESSIONAL' : 'DEVENIR_INVESTOR').subscribe((data) => {
      if (data) {
        this.roleModal = true;
        this.roleContenu = type;
      }
    })
  }
  textDirection: boolean = this.translate.getLangs()[0] !== 'ar';

  selectedRoles = []
  industry:any
  selectedIndustry = []
  capabilities: any
  selectedCapabilities = []
  selectedCountries = []


  roles:any
  dropdownSettings={}


  user$: Observable<User | null>;
  user: User | null = null;
  countries: Countries[] = [];
  countryName: string[] = [];
  url = this.route.url;
  direction: "rtl" | "ltr" = this.textDirection ? "rtl" : "ltr";

  constructor(private userService: UserApiService, private translate: TranslateService, private translationService: TranslationService, private route: Router, private auth: AuthenticationService, private http: HttpClient, private userSerivce: UserService, private loginService: AuthenticationService, private coachService: CoachApiService, private toaster: ToastrService, private investorService: InvestisseurApiService) {
    this.user$ = this.loginService.loggedIn$;
    this.countries = countries
    this.countryName = this.countries.map(country => country.name);
    this.user$.subscribe((user) => {
      this.user = user;
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateDirection(event.lang);
      this.direction = this.textDirection ? "rtl" : "ltr";
    });
    this.roles = [
      {'item_id': 1, 'item_text': this.translate.instant('COACH'), 'item_value': 'Coach'},
      {'item_id': 2, 'item_text': this.translate.instant('CONSULTANT'), 'item_value': 'Consultant'},
      {'item_id': 3, 'item_text': this.translate.instant('MENTOR'), 'item_value': 'Mentor'},
      {'item_id': 4, 'item_text': this.translate.instant('TRAINER'), 'item_value': 'Trainer'},

    ];
    this.industry = [
      {'item_id': 1, 'item_text': this.translate.instant('FINTECH'), 'item_value': 'FinTech'},
      {'item_id': 2, 'item_text': this.translate.instant('AGRITECH'), 'item_value': 'AgriTech'},
      {'item_id': 3, 'item_text': this.translate.instant('SMES'), 'item_value': 'SMEs'},
      {'item_id': 4, 'item_text': this.translate.instant('ENVIRONMENT'), 'item_value': 'Environment'},
      {'item_id': 5, 'item_text': this.translate.instant('EDUCATION'), 'item_value': 'Education'},
      {'item_id': 6, 'item_text': this.translate.instant('HEALTH'), 'item_value': 'Health'},
      {'item_id': 7, 'item_text': this.translate.instant('GOVERNMENT'), 'item_value': 'Government'},
      {'item_id': 8, 'item_text': this.translate.instant('TOURISM'), 'item_value': 'Tourism'},
      {'item_id': 9, 'item_text': this.translate.instant('SERVICES'), 'item_value': 'Services'},
      {'item_id': 10, 'item_text': this.translate.instant('TRANSPORT'), 'item_value': 'Transport'},
    ];
    this.capabilities=[
      {'item_id': 1, 'item_text': this.translate.instant('ARTIFICIAL_INTELLIGENCE'), 'item_value': 'Artificial Intelligence'},
      {'item_id': 2, 'item_text': this.translate.instant('DESIGN_UX_UI'), 'item_value': 'Design & UX/UI'},
      {'item_id': 3, 'item_text': this.translate.instant('DIGITAL_TECHNOLOGY'), 'item_value': 'Digital Technology'},
      {'item_id': 4, 'item_text': this.translate.instant('GROWTH_MARKETING_SALES'), 'item_value': 'Growth Marketing & Sales'},
      {'item_id': 5, 'item_text': this.translate.instant('INNOVATION_ENTREPRENEURSHIP'), 'item_value': 'Innovation & Entrepreneurship'},
      {'item_id': 6, 'item_text': this.translate.instant('LEGAL_GOVERNANCE'), 'item_value': 'Legal & Governance'},
      {'item_id': 7, 'item_text': this.translate.instant('M_AND_A'), 'item_value': 'M&A'},
      {'item_id': 8, 'item_text': this.translate.instant('PEOPLE_ORGANIZATION'), 'item_value': 'People & Organization'},
      {'item_id': 9, 'item_text': this.translate.instant('PEDAGOGY'), 'item_value': 'Pedagogy'},
      {'item_id': 10, 'item_text': this.translate.instant('SUSTAINABILITY_SOCIAL_IMPACT'), 'item_value': 'Sustainability & Social Impact'},
      {'item_id': 11, 'item_text': this.translate.instant('STRATEGY_CORPORATE_FINANCE'), 'item_value': 'Strategy & Corporate Finance'},
      {'item_id': 12, 'item_text': this.translate.instant('RISK_RESILIENCE'), 'item_value': 'Risk & Resilience'},
      {'item_id': 13, 'item_text': this.translate.instant('OPERATIONS_LOGISTICS'), 'item_value': 'Operations & Logistics'},


    ]

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
  }


  getAllCountries() {
    this.http.get('https://restcountries.com/v3.1/all').subscribe((data: any) => {
      this.countries = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
      this.countryName = this.countries.map((country: any) => country.name.common);
    });
  }
  selectedRolesEnglish!:string[]
  selectedIndustryEnglish!:string[]
  selectedCapibilitiesEnglish!:string[]

  becomeCoach() {


    if (this.coach.years_experience == "") {
      this.toaster.error('Please enter your years of experience');
      return;
    }
    // if (this.coach.governonate == "") {
    //   this.toaster.error('Please enter your governonate');
    //   return;
    // }
    if (this.coach.currency == "") {
      this.toaster.error('Please enter your currency');
      return;
    }
    if (this.coach.standardFees == "") {
      this.toaster.error('Please enter your standard fees');
      return;
    }
    if (this.coach.per == "") {
      this.toaster.error('Please enter your per');
      return;
    }
    if (this.coach.useful_information == "") {
      this.toaster.error('Please enter useful information');
      return;
    }


    this.selectedRolesEnglish = this.selectedRoles.map((role: any) =>

      this.roles.find((r:any) => r.item_id === role.item_id)?.item_value
    );
    this.selectedIndustryEnglish = this.selectedIndustry.map((industry: any) =>
      this.industry.find((r:any) => r.item_id === industry.item_id)?.item_value
    );
    this.selectedCapibilitiesEnglish = this.selectedCapabilities.map((capability: any) =>
      this.capabilities.find((r:any) => r.item_id === capability.item_id)?.item_value
    );

    this.coach.role = this.selectedRolesEnglish;
    this.coach.industry = this.selectedIndustryEnglish;
    this.coach.capabilities = this.selectedCapibilitiesEnglish;
    this.coach.country = this.selectedCountries;
    this.coachService.becomeCoach(this.coach).subscribe((response: any) => {
        this.toaster.success(' for joing our professionals community', 'Congrats');
      this.auth.loggedIn.next(response);
        this.roleModal = false;
      setItem("user", {...response, token: getItem("user")?.token});

      }
    );

  }

  becomeInvestor() {

    if (this.investisseur.investment_ticket == "") {
      this.toaster.error('Please enter your investment ticket');
      return;
    }
    if (this.investisseur.currency == "") {
      this.toaster.error('Please enter your currency');
      return;
    }
    if (this.investisseur.working_area == "") {
      this.toaster.error('Please enter your working area');
      return;
    }
    if (this.investisseur.previous_investments == "") {
      this.toaster.error('Please enter your previous investments');
      return;
    }
    if (this.investisseur.useful_information == "") {
      this.toaster.error('Please enter useful information');
      return;
    }
    // if (this.investisseur.governonate == "") {
    //   this.toaster.error('Please enter your governonate');
    //   return;
    // }






    this.investisseur.activty_area = this.selectedIndustryEnglish;
    this.investorService.becomeInvestor(this.investisseur).subscribe((response: any) => {
      this.toaster.success(' for joing our investors community', 'Congrats');
      this.auth.loggedIn.next(response);
      this.roleModal = false;
      setItem("user", {...response, token: getItem("user")?.token});
    });

  }

  cancel() {
    this.roleModal = false;
  }

  getHeaderText(): string {
    return this.roleContenu !== 'Professional' ? this.translate.instant('READY_TO_INVEST') : this.translate.instant('ARE_YOU_A_PROFESSIONAL');
  }

  updateDirection(lang: string) {
    this.textDirection = (lang !== 'ar');
  }

}
