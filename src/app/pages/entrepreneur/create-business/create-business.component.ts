import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {debounceTime, distinctUntilChanged, Observable, of, Subscription, switchMap, tap} from 'rxjs';
import {UserApiService} from 'src/app/api/user-api.service';
import {Project} from 'src/app/Models/Projet';
import {User} from 'src/app/Models/User';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {EntrepreneurService} from 'src/app/services/entrepreneur.service';
import {ProjectService} from 'src/app/services/project.service';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.css']
})
export class CreateBusinessComponent implements OnInit {
  business: Project = new Project();
  private subscriptions = new Subscription();
  learnBusiness=this.business.learnBusiness;
  image: File | null = null;
  imageMin: File | null = null;
  image2: File | null = null;
  imageMin2: File | null = null;
  loggedUser$: Observable<User | null>;
  user!: User | null;
  dropdownList!: any[];
  dropdownList2!: any[];
  canAddCoFounder = false;
  selectedItems!: any[];
  selectedItems2!: any[];
  /*entrepreneurs$: Observable<User[]>;
  entrpreneurs: User[] = [];*/
  dropdownSettings!: IDropdownSettings;
  dropdownSettings2!: IDropdownSettings;
  searchControl = new FormControl();
  @ViewChild('dropdown', { static: false }) dropdown!: any;

  constructor(private router:Router,private loginService: AuthenticationService,private entrepreneurService: EntrepreneurService,private userService:UserApiService,private http: HttpClient, private projectService: ProjectService, private activatedRoute: ActivatedRoute) {
    userService.hasPermissionBusiness().subscribe()
    this.subscriptions.add(
      this.userService.hasPermission('INTEGRER_BUSINESS_COFONDATEUR').subscribe(data => {
        this.canAddCoFounder = data;
      })
    );
    this.loggedUser$ = this.loginService.loggedIn$;
    this.subscriptions.add(
      this.loggedUser$.subscribe(user => {
        this.user = user;
      })
    );
    /*this.entrepreneurs$ = this.entrepreneurService.findAllUsers();
    this.subscriptions.add(
      this.entrepreneurs$.subscribe(entrepreneurs => {
        this.entrpreneurs = entrepreneurs;
        this.dropdownList = this.entrpreneurs.map(entrepreneur => ({
          item_id: entrepreneur.id,
          item_text: `${entrepreneur.prenom} ${entrepreneur.nom} `
        }));
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'item_id',
          textField: 'item_text',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          enableCheckAll: false
        };*/

        this.activatedRoute.queryParams.pipe(switchMap((params) => {
          if (params['id'] != undefined) {
            this.userService.hasPermission('GERER_PROFIL_ENTREPRISE').subscribe()
            return this.projectService.findById(params['id'])
          }
          return of(null)
        }), tap((value) => {
            if (value) {
              this.business = value
              this.learnBusiness = this.business.learnBusiness;
              this.selectedItems = this.business.coFounders.map(coFounder => {
                return {
                  item_id: coFounder.id,
                  item_text: `${coFounder.prenom} ${coFounder.nom} `
                };
              });
              this.selectedItems.push({
                item_id: this.business.entrepreneur.id,
                item_text: `${this.business.entrepreneur.prenom} ${this.business.entrepreneur.nom} `
              });
              this.dropdownList2 = this.selectedItems.map(entrepreneur => ({
                item_id: entrepreneur.item_id,
                item_text: entrepreneur.item_text
              }));
              this.selectedItems2 = [{
                item_id: this.business.entrepreneur.id,
                item_text: ` ${this.business.entrepreneur.prenom} ${this.business.entrepreneur.nom}`
              }];

              this.dropdownSettings2 = {
                singleSelection: true,
                idField: 'item_id',
                textField: 'item_text',
                itemsShowLimit: 1,
                allowSearchFilter: true,
                enableCheckAll: false
              };

            } else {
              this.business = new Project();
              this.business.publique = true;
            }
          }
        )).subscribe();
  }
  ngOnInit() {
    this.setupSearchListener();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false
    };
  }

  setupSearchListener() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), 
        distinctUntilChanged(), 
        switchMap((query) => {
          if (!query) {
            this.dropdownList = [];
            return of([]);
          }
          return this.userService.searchByEmail(query); 
        })
      )
      .subscribe((data) => {
        this.dropdownList = data.map((user) => ({
          item_id: user.id,
          item_text: `${user.prenom} ${user.nom}`,
        }));
        this.dropdownSettings = {
          defaultOpen: true
        }
      });
  }
  
  openDropdown() {
    if (this.dropdown && this.dropdown.dropdownButton) {
      // Access the dropdown's button and simulate the click
      this.dropdown.dropdownButton.nativeElement.click(); // Simulate click
    } else {
      console.log('Dropdown is not available or button is missing.');
    }
  }
  
  deletePic() {
    this.business.logo = ''
  }
  onItemSelect(item: any) {
    this.dropdownList2 = this.selectedItems.map(entrepreneur => ({
      item_id: entrepreneur.item_id,
      item_text: entrepreneur.item_text
    }));
    console.log(this.selectedItems);
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
  }



  onFileChange2(event: any) {
    this.image2 = event.target.files[0];
    this.imageMin2 = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin2 = evento.target.result;
    };
    if (this.image2) {
      fr.readAsDataURL(this.image2);
    }
  }
  changing(){
    this.learnBusiness=!this.learnBusiness;
  }
  submit() {
    this.business.learnBusiness=this.learnBusiness;
    if (this.business.id == 0) {
      //create
      if (this.selectedItems) {
        this.selectedItems.forEach((item) => {
          if(item.item_id!=this.user!.id){
            this.business.coFoundersId.push(item.item_id);
          }
        });
      }
      this.projectService.create(this.business, this.image, this.image2)
    } else {
      //update
      if (this.selectedItems) {
        this.business.coFoundersId = [];
        this.selectedItems.forEach((item) => {
          this.business.coFoundersId.push(item.item_id);
        });
      }
      if(this.selectedItems2[0].item_id!=this.business.entrepreneur.id){
        this.business.entrepreneur.id = this.selectedItems2[0].item_id;
      }
      this.business.coFoundersId=this.business.coFoundersId.filter(cofounderId=> cofounderId!=this.business.entrepreneur.id)
      this.projectService.update(this.business, this.image, this.image2)
    }

  }

}
