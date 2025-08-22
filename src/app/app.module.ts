import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {QuillModule} from 'ngx-quill';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {Navbar2Component} from './components/navbar2/navbar2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient} from '@angular/common/http';
import {NgxMatIntlTelInputComponent} from 'ngx-mat-intl-tel-input-v16';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ForgetpasswordComponent} from './pages/forgetpassword/forgetpassword.component';
import {Navbar3Component} from './components/navbar3/navbar3.component';
import {ProjectsComponent} from './pages/entrepreneur/projects/projects.component';
import {EntrepreneurComponent} from './pages/entrepreneur/entrepreneur/entrepreneur.component';
import {DefaultImagePipe} from './pipes/defaultimage.pipe';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {RatingModule} from 'primeng/rating';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {GettingstartedComponent} from './pages/entrepreneur/gettingstarted/gettingstarted.component';
import {Etape1Component} from './pages/entrepreneur/etape/etape1/etape1.component';
import {Etape2Component} from './pages/entrepreneur/etape/etape2/etape2.component';
import {Etape3Component} from './pages/entrepreneur/etape/etape3/etape3.component';
import {Etape4Component} from './pages/entrepreneur/etape/etape4/etape4.component';
import {Etape5Component} from './pages/entrepreneur/etape/etape5/etape5.component';
import {Etape6Component} from './pages/entrepreneur/etape/etape6/etape6.component';
import {Etape7Component} from './pages/entrepreneur/etape/etape7/etape7.component';
import {EtapeComponent} from './pages/entrepreneur/etape/etape.component';
import {BmcViewComponent} from './pages/entrepreneur/bmc-view/bmc-view.component';
import {StepsComponent} from './components/steps/steps.component';
import {SsoComponent} from './pages/sso/sso.component';
import {ProgramComponent} from './pages/sso/program/program.component';
import {Auth} from './interceptor/auth';
import {MainFeedComponent} from './pages/main-feed/main-feed.component';
import {MainComponent} from './pages/main/main.component';
import {MainProfileComponent} from './pages/main-profile/main-profile.component';
import {MyprofileComponent} from "./pages/main-profile/myprofile/myprofile.component";
import {UpdatemyprofileComponent} from "./pages/main-profile/updatemyprofile/updatemyprofile.component";
import {NotificationPipe} from './pipes/notification.pipe'; ;
import {RolePipe} from './pipes/role.pipe';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {VerifEmailComponent} from './pages/verif-email/verif-email.component';
import {CertificateComponent} from './pages/entrepreneur/certificate/certificate.component';
import {OrganizationTypePipe} from './pipes/organization-type.pipe';
import {DeleteDialogComponent} from './components/delete-dialog/delete-dialog.component';
import {OrganizationSectorPipe} from './pipes/organization-sector.pipe';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DropdownModule} from 'primeng/dropdown';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {environment} from '../environments/environment.development';
import {TermesConditionComponent} from './pages/termes-condition/termes-condition.component';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {DiscoverProjectsComponent} from './pages/entrepreneur/discover-projects/discover-projects.component';
import {FormatDatePipe} from './pipes/format-date.pipe';
import {ChartModule} from 'primeng/chart';
import {FullCalendarModule} from '@fullcalendar/angular';
import {SearchPipe} from './pipes/search.pipe';
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {AccordionModule} from "primeng/accordion";
import {EmailVerifComponent} from './pages/email-verif/email-verif.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ProgramsAsCoachComponent} from './program-main/programs-as-coach/programs-as-coach.component';
import {UserConnectionsComponent} from './pages/main-profile/myprofile/user-connections/user-connections.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import {PostComponent} from './components/post/post.component';
import {OnePostComponent} from './pages/one-post/one-post.component';
import {EventFilterPipe} from './pipes/event-filter.pipe';
import {ArticleFilterPipe} from './pipes/article-filter.pipe';
import {PickerComponent} from '@ctrl/ngx-emoji-mart';
import {FeaturePipe} from './pipes/feature.pipe';


import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SharedPostComponent} from './components/shared-post/shared-post.component';
import {TooltipDirective} from '@webed/angular-tooltip';
import {NgxUiLoaderModule} from "ngx-ui-loader";
import {ProgressBarModule} from "primeng/progressbar";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SpinnerModule} from "primeng/spinner";
import {ChooseprofessionalComponent} from './pages/entrepreneur/chooseprofessional/chooseprofessional.component';
import {TextContentPipe} from './pipes/textContent.pipe';
import {CreateBusinessComponent} from './pages/entrepreneur/create-business/create-business.component';
import {BusinessDetailComponent} from './pages/entrepreneur/business-detail/business-detail.component';
import {BusinessCardComponent} from './components/business-card/business-card.component';
import {DiscountPricePipe} from './pipes/discount-price.pipe';

import {Etape8Component} from './pages/entrepreneur/etape/etape8/etape8.component';

import {SubmitFormComponent} from './pages/submit-form/submit-form.component';
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from 'ng-recaptcha';
import {AboutusComponent} from './pages/aboutus/aboutus.component';
import {ContactusComponent} from './pages/contactus/contactus.component';
import {ProgramSortPipe} from './pipes/program-sort.pipe';
import {ProgramFilterPipe} from './pipes/program-filter.pipe';

import {CarouselModule} from 'primeng/carousel';
import {NgOtpInputModule} from "ng-otp-input";
import {CertificationComponent} from './pages/certification/certification.component';
import {BusinesschallengeComponent} from './pages/businesschallenge/businesschallenge.component';

// import {TourMatMenuModule} from 'ngx-ui-tour-md-menu';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function SetDirection(): string {
  let lang = localStorage.getItem('Language');
  if (lang == 'ar') {
    return 'rtl';
  } else {
    return 'ltr';
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    Navbar2Component,
    ForgetpasswordComponent,
    Navbar3Component,
    ProjectsComponent,
    EntrepreneurComponent,
    DefaultImagePipe,
    TextContentPipe,
    GettingstartedComponent,
    Etape1Component,
    Etape2Component,
    Etape3Component,
    Etape4Component,
    Etape5Component,
    Etape6Component,
    Etape7Component,
    EtapeComponent,
    BmcViewComponent,
    StepsComponent,
    MyprofileComponent,
    UpdatemyprofileComponent,
    SsoComponent,
    ProgramComponent,
    MainFeedComponent,
    MainComponent,
    MainProfileComponent,
    NotificationPipe,
    RolePipe,
    VerifEmailComponent,
    CertificateComponent,
    OrganizationTypePipe,
    DeleteDialogComponent,
    OrganizationSectorPipe,
    NotFoundComponent,
    TermesConditionComponent,
    DiscoverProjectsComponent,
    FormatDatePipe,
    SearchPipe,
    SideBarComponent,
    EmailVerifComponent,
    ProgramsAsCoachComponent,
    ContactFormComponent,
    UserConnectionsComponent,
    EventFilterPipe,
    PostComponent,
    OnePostComponent,
    FeaturePipe,
    SharedPostComponent,
    ChooseprofessionalComponent,
    CreateBusinessComponent,
    BusinessDetailComponent,
    BusinessCardComponent,
    DiscountPricePipe,
    ArticleFilterPipe,
    Etape8Component,
    SubmitFormComponent,
    AboutusComponent,
    ContactusComponent,
    ProgramSortPipe,
    ProgramFilterPipe,
    CertificationComponent,
    BusinesschallengeComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    FormsModule,
    RecaptchaV3Module,
    ToastrModule.forRoot({
      timeOut: 5000, // Display for 5 seconds
      extendedTimeOut: 1000, // Additional 1 second on hover
      closeButton: true,
      positionClass: 'toast-top-right'
    }),
    TooltipDirective,
    HttpClientModule,
    NgxMatIntlTelInputComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTooltipModule,
    DialogModule,
    CarouselModule,
    ButtonModule,
    AvatarModule,
    RatingModule,
    AvatarGroupModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    ProgressSpinnerModule,
    MatProgressSpinnerModule,
    DropdownModule,
    CdkDropList,
    CdkDrag,
    ChartModule,
    FullCalendarModule,
    MatExpansionModule,
    AccordionModule,
    PickerComponent,
    NgxUiLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    QuillModule.forRoot({
      formats: [],
      modules: {

        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{'header': 1}, {'header': 2}],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],
          [{'indent': '-1'}, {'indent': '+1'}],
          [{'direction': 'rtl'}],
          [{'size': ['small', false, 'large', 'huge']}],
          [{'header': [1, 2, 3, 4, 5, 6, false]}],
          [{'color': []}, {'background': []}],
          [{'font': []}],
          [{'align': []}],
          ['clean'],
          ['link']
        ]
      }
    }),
    ProgressBarModule,

    InfiniteScrollModule,
    SpinnerModule,
    // TourMatMenuModule
  ],
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Auth,
      multi: true,
    },
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.siteKey}  // Add reCAPTCHA key here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
