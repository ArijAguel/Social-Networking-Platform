import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from 'src/app/Models/User';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {passwordValidator} from 'src/app/utils/passwordValidator';
import {getItem} from "../../utils/localStorage";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {ReCaptchaV3Service} from 'ng-recaptcha';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../login/login.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;

  type = 'password';
  type2 = 'password';

  showPassword(n: number) {
    if (n == 1) {
      if (this.type === 'password') {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    } else {
      if (this.type2 === 'password') {
        this.type2 = 'text';
      } else {
        this.type2 = 'password';
      }
    }
  }

  phoneNumber: String | undefined
  acceptTerms: any;
  password: string = '';
   constructor(private fb: FormBuilder, private loginService: AuthenticationService,private router:Router,    private renderer: Renderer2,
    private toaster: ToastrService,
    private recaptchaV3Service: ReCaptchaV3Service,) {
     if(  getItem("user") !== null){
       this.loginService.isEmailVerified$.subscribe((data) => {
         if (data) {
           this.router.navigate(['/email-verification'])

         } else {
           this.router.navigate(['/feed'])
         }
       })
     }
   }
   ngOnDestroy() {
    this.renderer.removeClass(document.body, 'recaptcha');
  }
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'recaptcha');
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator]],
      repeatPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }


  selectedCountry: string = '20 M';
  countries: any[] = [
    { code: '20 M', name: '20 M' },
    { code: '50 M', name: '50 M' },
    { code: '100 M', name: '100 M' },
    { code: '500 M', name: '500 M' },
    { code: '1 MD', name: '1 MD' },
  ];

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.recaptchaV3Service.execute('signup').subscribe(
      (token: string) => {
        let user = new User()
        user.nom=this.signupForm.value.name
        user.prenom=this.signupForm.value.firstname
        user.email=this.signupForm.value.email
        user.dateNaissance=this.signupForm.value.birthday
        user.password = this.signupForm.value.password
        user.recaptchaToken = token
        this.loginService.register(user)
      },
      (error) => {
        this.toaster.error('Une erreur s\'est produite!', '', {
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    );

  }



}
