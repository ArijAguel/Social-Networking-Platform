import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ForgetpasswordComponent} from './pages/forgetpassword/forgetpassword.component';
import {ProjectsComponent} from './pages/entrepreneur/projects/projects.component';
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
import {etape1Resolver} from './resolvers/etape1.resolver';
import {etape2Resolver} from './resolvers/etape2.resolver';
import {MainFeedComponent} from "./pages/main-feed/main-feed.component";
import {MainProfileComponent} from "./pages/main-profile/main-profile.component";
import {MyprofileComponent} from "./pages/main-profile/myprofile/myprofile.component";
import {UpdatemyprofileComponent} from "./pages/main-profile/updatemyprofile/updatemyprofile.component";
import {MainComponent} from "./pages/main/main.component";
import {etape3Resolver} from './resolvers/etape3.resolver';
import {etape4Resolver} from './resolvers/etape4.resolver';
import {etape5Resolver} from './resolvers/etape5.resolver';
import {etape6Resolver} from './resolvers/etape6.resolver';
import {etape7Resolver} from './resolvers/etape7.resolver';
import {authenticatedGuard} from "./guards/authenticated.guard";
import {jwtGuard} from "./guards/jwt.guard";
import {VerifEmailComponent} from "./pages/verif-email/verif-email.component";
import {CertificateComponent} from './pages/entrepreneur/certificate/certificate.component';
import {notAuthGuard} from "./guards/not-auth.guard";
import {CanDeactivateFeature} from "./guards/CanComponentDeactivate.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {TermesConditionComponent} from './pages/termes-condition/termes-condition.component';
import {programDetailAccessGuard} from "./guards/program-detail-access.guard";
import {participationAccessGuard} from "./guards/participation-access.guard";
import {DiscoverProjectsComponent} from './pages/entrepreneur/discover-projects/discover-projects.component';
import {EmailVerifComponent} from "./pages/email-verif/email-verif.component";
import {isEmailVerifiedGuard} from "./guards/is-email-verified.guard";
import {ProgramsAsCoachComponent} from "./program-main/programs-as-coach/programs-as-coach.component";
import {OnePostComponent} from './pages/one-post/one-post.component';
import {feedResolver} from './resolvers/feed.resolver';
import {BusinessDetailComponent} from './pages/entrepreneur/business-detail/business-detail.component';
import {CreateBusinessComponent} from './pages/entrepreneur/create-business/create-business.component';
import {bmcGuard} from "./guards/bmc.guard";

import {Etape8Component} from './pages/entrepreneur/etape/etape8/etape8.component';
import {etape8Resolver} from './resolvers/etape8.resolver';
import {SubmitFormComponent} from "./pages/submit-form/submit-form.component";
import {AboutusComponent} from './pages/aboutus/aboutus.component';
import {ContactusComponent} from './pages/contactus/contactus.component';
import {CertificationComponent} from './pages/certification/certification.component';
import { BusinesschallengeComponent } from './pages/businesschallenge/businesschallenge.component';

const routes: Routes = [
  {path: "login", component: LoginComponent, canActivate: [notAuthGuard]},//transalted
  {path: "email-verification", component: EmailVerifComponent},//transalted
  {path: "signup", component: SignupComponent, canActivate: [notAuthGuard],},//transalted
  {path: "verifyAccount", component: VerifEmailComponent, canActivate: [notAuthGuard],},//transalted
  {path: "contactus", component: ContactusComponent, canActivate: [notAuthGuard],},//transalted
  {path: "certification", component: CertificationComponent, canActivate: [notAuthGuard],},
  {path: "businessChallenge", component: BusinesschallengeComponent, canActivate: [notAuthGuard],},
  {path: "forgotPassword", component: ForgetpasswordComponent, canActivate: [notAuthGuard],},//transalted
  {path: "termes-condition", component: TermesConditionComponent, canActivate: [notAuthGuard],},//transalted
  {path: "", component: HomeComponent, canActivate: [notAuthGuard],},
  {path: "aboutus", component: AboutusComponent, canActivate: [notAuthGuard],},
  {path: "fr", component: HomeComponent, canActivate: [notAuthGuard],},
  {path: "en", component: HomeComponent, canActivate: [notAuthGuard],},
  {path: "ar", component: HomeComponent, canActivate: [notAuthGuard],},
  {
    path: "", component: MainComponent,
    canActivate: [authenticatedGuard, jwtGuard,isEmailVerifiedGuard],
    children: [

      {path: 'submit-form', component: SubmitFormComponent},
      {
        path: "feed",//transalted
        component: MainFeedComponent,
        children: [
          {path: "", redirectTo: "my-business",pathMatch: "full"},
          {path: "my-business", component: ProjectsComponent},//transalted
          {path: "my-business/detail", component: BusinessDetailComponent},//transalted
          {path: "my-business/create", component: CreateBusinessComponent,canDeactivate:[CanDeactivateFeature]},//transalted
          {path: "discover-business", component: DiscoverProjectsComponent},//transalted
          {path: "timeline/:id", component: GettingstartedComponent},
          {path: "certificate/:id", component: CertificateComponent},
          {
            path: "etape", component: EtapeComponent, children: [
              { path: ":id/1", component: Etape1Component ,resolve: {etape1:etape1Resolver},canDeactivate:[CanDeactivateFeature]},
              { path: ":id/2", component: Etape2Component,resolve: {etape2:etape2Resolver },canDeactivate:[CanDeactivateFeature]} ,
              { path: ":id/3", component: Etape3Component,resolve: {etape3:etape3Resolver } ,canDeactivate:[CanDeactivateFeature]},
              { path: ":id/4", component: Etape4Component,resolve: {etape4:etape4Resolver}  ,canDeactivate:[CanDeactivateFeature]},
              { path: ":id/5", component: Etape5Component ,resolve: {etape5:etape5Resolver},canDeactivate:[CanDeactivateFeature]},
              { path: ":id/6", component: Etape6Component ,resolve: {etape6:etape6Resolver,etape5:etape5Resolver },canDeactivate:[CanDeactivateFeature]},
              { path: ":id/7", component: Etape7Component ,resolve: {etape7:etape7Resolver,etape4:etape4Resolver,etape5:etape5Resolver },canDeactivate:[CanDeactivateFeature]},
              { path: ":id/8", component: Etape8Component ,resolve: {etape8:etape8Resolver },canDeactivate:[CanDeactivateFeature]}
            ]
          },
          {
            path: "bmcview/:id",
            component: BmcViewComponent,
            resolve: {etape3: etape3Resolver},
            canActivate: [bmcGuard]
          },


        ]
      },

      {
        path: "profile",
        component: MainProfileComponent,
        children: [
          {path: "", component: MyprofileComponent},
          {path: "update", component: UpdatemyprofileComponent},
        ]
      },




    ]
  },
  {path: "**", component: NotFoundComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
