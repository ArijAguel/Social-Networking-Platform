import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Observable, Subscription} from 'rxjs';
import {Remarque} from 'src/app/Models/Remarque';
import {User} from 'src/app/Models/User';
import {RemarkService} from 'src/app/services/Remark.service';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {CoachService} from 'src/app/services/coach.service';
import {EditableService} from 'src/app/services/editable.service';
import {RemarkCharedDataService} from 'src/app/services/remark-chared-data.service';
import {TranslationService} from 'src/app/services/translation.service';
import {UserService} from "../../../services/user.service";
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.css']
})
export class EtapeComponent implements OnInit, OnDestroy {
  Openhelp: boolean = false;
  Openinfo: boolean = false;
  OpenUpdate: boolean = false;
  selectedRemark = new Remarque();
  showDrawer = false;
  myPost:boolean=false;  
  remarques!: Remarque[];


  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public translationService: TranslationService,
    private remarkService: RemarkService,
    private editableService: EditableService,
    private dataService: RemarkCharedDataService,
    private loginService: AuthenticationService,
    private route: ActivatedRoute,
    private userService: UserService,
    private ngxService: NgxUiLoaderService
  ) {
    this.loggedUser$ = this.loginService.loggedIn$;
    this.subscriptions.add(
      this.loggedUser$.subscribe(user => this.user = user)
    );
    this.subscriptions.add(
      this.dataService.data$.subscribe((data: Remarque[]) => {
        this.remarques = data || []; 
        this.remarques.map(remarque => remarque.user.id!=0?remarque.myPost = remarque.user.id === this.user?.id:true);
      })
    );
    

    this.editable = this.editableService.getIsEditable();

  }

  help() {
    this.userService.hasPermission("INTERAGIR_REMARQUES_PROFESSIONNEL").subscribe((data) => {
        this.Openhelp = true
      }
    )
  }

  id!: number;
  step!: number;
  loggedUser$: Observable<User | null>;
  user!: User | null;
  stepNumber: string | undefined;
  editable: boolean;
  interventionApplicationVisibile: boolean = false;
  private subscriptions: Subscription = new Subscription();

  info() {
    this.userService.hasPermission("ENVOYER_DEMANDES_ASSISTANCE_INDIVIDUELLES").subscribe((data) => {
        if (data) {
          this.Openinfo = true
        }
      }
    )
  }

  selectedUser: number = 0;

  selectCoach(userid: number) {
    this.Openinfo = false;
    this.projectId = this.id
    this.interventionApplicationVisibile = true;
    this.selectedUser = userid;
  }

  closeApplication() {
    this.interventionApplicationVisibile = false;
    this.selectedUser = 0;
  }

  closeInfo() {
    this.Openinfo = false;
  }
  projectId = 0;

  ngOnInit(): void {
    this.id = this.route.firstChild?.snapshot.params['id'];
    this.stepNumber = this.route.snapshot.firstChild?.url[1].path;
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);
    
  }

  deleteRemark(id: number) {
    this.remarkService.delete(id);
    this.dataService.sendData(this.remarques.filter(remarque => remarque.id !== id));
    this.Openhelp = false;
  }

  openupdateRemark(remarque: Remarque) {
    this.selectedRemark = remarque;
    this.Openhelp = false;
    this.OpenUpdate = true;
  }

  updateRemark() {
    this.remarkService.update(this.selectedRemark);
    this.dataService.sendData(this.remarques.map(remarque => remarque.id === this.selectedRemark.id ? this.selectedRemark : remarque));
    this.OpenUpdate = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
