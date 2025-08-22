import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginDto } from 'src/app/Models/dto/LoginDto';
import { AuthenticationAPIService } from 'src/app/api/auth-api.service';
import { LoginApiService } from 'src/app/api/login-api.service';
import {AuthenticationService} from "../../services/authentication.service";
import {setItem} from "../../utils/localStorage";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  email:string = '';
  code:string = '';
  step3 = false;
  step2 = false;
  step1 = true;
  password = ""
  confirmPass = ""
  forgetPasswordForm!: FormGroup;

  constructor(private router:Router,private fb: FormBuilder,private authService:AuthenticationAPIService , private toaster:ToastrService, private auth:AuthenticationService,private notificationService:NotificationService) { }
  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }



  forgetPassword(){

    let loginDto = new LoginDto(this.forgetPasswordForm.value.email , '');
    this.authService.forgotPassword(loginDto).subscribe((data)=>{
      this.toaster.success('','Reset Password Code has been sent to your email');
      this.step1 = false;
      this.step2 = true;
    });
  }


  verifyCode(){
    this.authService.verifyPasswordCode( {'email':this.forgetPasswordForm.value.email,'code':this.code}).subscribe((data)=>{
      this.step2 = false;
      this.step3 = true;
    });
  }

  changePassword(){

      let loginDto = new LoginDto(this.forgetPasswordForm.value.email , this.password);

      this.authService.resetPassword(loginDto).subscribe((response)=>{
        let user1 = response.user
        user1.token = response.token
        setItem("user", user1);
        this.auth.loggedIn.next(response.user);
        this.notificationService.getNotifications()
        user1.emailVerif==null? this.router.navigate(["feed"]): this.router.navigate(["auth/email-verification"]);
      });
  }


}
