import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from 'src/app/Models/User';
import {UpdatePaswordDto} from 'src/app/Models/dto/UpdatePawwordDto';
import {UserApiService} from 'src/app/api/user-api.service';
import {UserService} from 'src/app/services/user.service';
import {getItem} from 'src/app/utils/localStorage';

@Component({
  selector: 'app-updatemyprofile',
  templateUrl: './updatemyprofile.component.html',
  styleUrls: ['./updatemyprofile.component.css']
})
export class UpdatemyprofileComponent {
  user = new User();
  user$: Observable<User>;
  localId:number ;
  @Output() newUser= new EventEmitter()

  constructor(private userApiService: UserApiService,private router: Router, private userService: UserService,private activatedRoute: ActivatedRoute,private fb: FormBuilder) {
    this.localId = getItem('user').id;
    this.user$ = this.userApiService.findById(this.localId);

  }
ngOnInit(): void {
    this.user$.subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
      }
    });
  }
  phoneNumber!: string;
  image: File | null = null;
  imageMin: File | null = null;
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
  acceptTerms: any;

  selectedCountry: string = '20 M'; // Initialize to an appropriate default value
  countries: any[] = [
    { code: '20 M', name: '20 M' },
    { code: '50 M', name: '50 M' },
    { code: '100 M', name: '100 M' },
    { code: '500 M', name: '500 M' },
    { code: '1 MD', name: '1 MD' },
    // Add more countries as needed
  ];
  visible: boolean = false;
  visible2: boolean = false;
  updateImage(){
    this.visible=true;
  }
  updatePassword(){
    this.visible2=true;
  }
  changeVisibility(){
    this.userService.changeVisibility(this.user.id)
  }
  submitUpdateImage(form: NgForm){
    if(this.image){
      this.userService.setCurrentUserPhoto(this.localId,this.image,this.newUser)
      this.visible=false;

    }
  }
  submitUpdatePassword(form: NgForm){
    let dto = new UpdatePaswordDto(this.user.id,form.value.password)
    this.userService.updatePassword(dto)
    this.visible2=false;
  }
  onSubmit(user: User) {
    if (this.phoneNumber) {
      user.phoneNumber = this.phoneNumber
    }
    //this.userService.updateUser(this.user)

  }
  deleteUserImage(){
    this.userService.removeCurrentUserPhoto(this.localId,this.newUser)
  }
}
