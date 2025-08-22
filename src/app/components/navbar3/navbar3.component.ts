import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {map, Observable, of, startWith, Subject, switchMap, tap} from 'rxjs';
import {User} from 'src/app/Models/User';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../Models/Notification";
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {InboxService} from "../../services/inbox.service";
import {Investisseur} from "../../Models/investisseur";
import {Coach} from "../../Models/Coach";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {HttpClient} from "@angular/common/http";
import {CoachApiService} from "../../api/coach-api.service";
import {InvestisseurApiService} from "../../api/investisseur-api.service";
import {setItem} from "../../utils/localStorage";
import {TranslationService} from 'src/app/services/translation.service';
import {TranslateService} from '@ngx-translate/core';
import {MessageNotificationService} from "../../services/message-notification.service";

@Component({
  selector: 'app-navbar3',
  templateUrl: './navbar3.component.html',
  styleUrls: ['./navbar3.component.css']
})
export class Navbar3Component implements OnInit {
  // Notifications
  notificationMenuOpen = true
  flag = false;
  page: number = 0;
  key$ = new Subject<number>()
  notifs: Notification[] = [];
  notificationWs$ = this.notificationService.notifications$.pipe(tap((notifications: Notification[]) => {
    if (notifications.length > 0) {
      this.notifs.unshift(...notifications)
    }
  }));
  countNotifs$ = this.notificationService.count$.pipe(startWith(0), switchMap(() => this.notificationService.getUnseen()));

  notifications$: Observable<Notification[]> = this.key$.pipe(startWith(0), switchMap((page) => this.notificationService.getUserNotifications(page)), map((notifs: Notification[]) => {
    if (notifs.length == 0) {
      this.flag = true;
    } else {
      this.notifs.push(...notifs);
    }
    return this.notifs;
  }));
  user$: Observable<User | null>;
  user: User | null = new User();
  msgNumbers$ = this.messageNotification.msgsNumber$


  // End notifications

  isMobileMenu = false;
  isScrolled = false;
  profileMenuOpen = true;
  selectedLanguage

  constructor(private userService: UserService, private translationService: TranslateService, private translateService: TranslationService, private inboxService: InboxService, private userservice: UserService, private formBuilder: FormBuilder, private router: Router, private elementRef: ElementRef, private notificationService: NotificationService, private auth: AuthenticationService, private http: HttpClient, private userSerivce: UserService, private loginService: AuthenticationService, private coachService: CoachApiService, private toaster: ToastrService, private investorService: InvestisseurApiService, private messageNotification: MessageNotificationService) {
    this.user$ = this.loginService.loggedIn$;
    this.user$.subscribe((user) => {
      this.user = user;
    });
    this.user$ = this.loginService.loggedIn$;
    this.user$.subscribe(user => this.user = user)

    // this.inboxService.getInbox()
    this.selectedLanguage = this.translateService.getLanguage();
    const storedLanguage = this.translateService.getLanguage();
    if (!storedLanguage) {
      this.selectedLanguage = 'en';
      this.translateService.switchLanguage('en');
    }
    this.notificationWs$.subscribe()
  }

  formName: FormGroup = this.formBuilder.group({
    name: new FormControl('')
  })
  users$ = this.formName.get('name')?.valueChanges.pipe(
    switchMap((data) => data != '' && data != null ? this.userservice.getUsersByName(data) : of(null)),
  )


  url = this.router.url;

  onScroll() {
    if (!this.flag) {
      // this.loading = true;
      this.page = Math.floor(this.notifs.length / 10);
      this.key$.next(this.page);
    }
  }

  markSeen() {
    this.notificationService.markSeen();
  }

  deleteNotif(id: number, index: number) {
    this.notificationService.deleteNotif(id);
    this.notifs.splice(index, 1);
  }

  ngOnInit(): void {
    this.selectedLanguage = this.translateService.getLanguage()
  }


  logout() {
    this.loginService.logout()
    this.router.navigate(["login"])
  }

  openProfileMenu() {
    this.notificationMenuOpen = true;
    this.profileMenuOpen = !this.profileMenuOpen
  }

  openNotificationMenu() {
    this.profileMenuOpen = true;
    this.notificationMenuOpen = !this.notificationMenuOpen
    this.markSeen()
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.formName.get('name')?.setValue('')
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.notificationMenuOpen = true;
      this.profileMenuOpen = true;
    }
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    switch (language) {
      case 'English':
        this.selectedLanguage = 'en';
        this.translateService.switchLanguage('en');
        break;
      case 'العربية':
        this.selectedLanguage = 'ar';
        this.translateService.switchLanguage('ar');
        break;
      case 'Français':
        this.selectedLanguage = 'fr';
        this.translateService.switchLanguage('fr');
        break;
    }
    window.location.reload()

  }


  ComingSoonFeature() {
    this.toaster.warning('', 'This feature is coming soon');
  }

  investisseur = new Investisseur();
  coach = new Coach();

  roleModal: boolean = false;
  roleContenu = '';

  openRoleModal(type: string): void {
    this.userService.hasPermission(type === 'Professional' ? 'DEVENIR_PROFESSIONAL' : 'DEVENIR_INVESTOR').subscribe((data) => {
      if (data) {
        this.roleModal = true;
        this.roleContenu = type;
      }
    })
  }


  selectedRoles = []
  industry = [
    'FinTech',
    'Agritech',
    'SMEs',
    'Energy',
    'Environment',
    'Education',
    'Health',
    'Government',
    'Tourism',
    'Services',
    'Transport',
  ];
  selectedIndustry = []
  capabilities = [
    'Artificial Intelligence',
    'Design & UX/UI',
    'Digital & Technology',
    'Growth, Marketing & Sales',
    'Innovation & Entrepreneurship',
    'Legal & Governance',
    'M&A',
    'People & Organization',
    'Pedagogy',
    'Sustainability & Social Impact',
    'Strategy & Corporate Finance',
    'Risk & Resilience',
    'Operations & Logistics',
  ];
  selectedCapabilities = []

  years_experience: any;
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,

  };

  previous_investments: any;
  investment_ticket: any;
  roles = [
    'Consultant',
    'Coach',
    'Trainer',
    'Mentor',
  ];
  countries: any[] = [];

  becomeCoach(ngForm: NgForm) {
    this.coach.role = this.selectedRoles;
    this.coach.industry = this.selectedIndustry;
    this.coach.capabilities = this.selectedCapabilities;
    this.coachService.becomeCoach(this.coach).subscribe((response: any) => {
        this.toaster.success(' for joing our professionals community', 'Congrats');
        this.roleModal = false;
        let user1 = response.user
        user1.token = response.token
        setItem("user", user1);
        this.auth.loggedIn.next(response.user);
        this.roleModal = false;

      }
    );

  }

  becomeInvestor(ngForm: NgForm) {
    this.investisseur.activty_area = this.selectedIndustry;
    this.investorService.becomeInvestor(this.investisseur).subscribe((response: any) => {
      this.toaster.success('for joing our investors communityr', 'Congrats');

      let user1 = response.user
      user1.token = response.token
      setItem("user", user1);
      this.auth.loggedIn.next(response.user);
      this.roleModal = false;
    });

  }

  cancel() {
    this.roleModal = false;
  }

  checkRole(role: string) {
    let hasRole = false;
    this.user$.subscribe((user) => {
      if (user) {
        hasRole = user.roles.includes(role);
      }
    });
    return hasRole;
  }
}
