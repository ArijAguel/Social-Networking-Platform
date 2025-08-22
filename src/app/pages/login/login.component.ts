import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from 'src/app/Models/dto/LoginDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { getItem } from '../../utils/localStorage';
import { RECAPTCHA_V3_SITE_KEY, ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  constructor(
    private renderer: Renderer2,
    private toaster: ToastrService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private loginService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (getItem('user') !== null) {
      this.router.navigate(['/feed']);
    }
  }


ngOnDestroy() {
    this.renderer.removeClass(document.body, 'recaptcha');
}
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'recaptcha');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.recaptchaV3Service.execute('login').subscribe(
      (token: string) => {
        this.loginService.login(new LoginDto(this.loginForm.value.email, this.loginForm.value.password, token));
      },
      (error) => {
        this.toaster.error('Une erreur s\'est produite!', '', {
          closeButton: true,
          positionClass: 'toast-top-right',
        });
      }
    );
  }

  password = 'password';

  showPassword() {
    if (this.password === 'password') {
      this.password = 'text';
    } else {
      this.password = 'password';
    }
  }

}
