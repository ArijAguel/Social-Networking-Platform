import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-verif',
  templateUrl: './email-verif.component.html',
  styleUrls: ['./email-verif.component.css']
})
export class EmailVerifComponent implements OnInit {
  // user$;
  loading = {isLoading: false};
  resend = {
    wait: false,
    waitingTime: 60

  }
  value = "";

  constructor(private ngxService: NgxUiLoaderService, private authService: AuthenticationService, private router: Router) {
    this.authService.isEmailVerified$.subscribe(data => {
      if (data) {
        this.router.navigate(["feed"])
      }
    })
  }

  ngOnInit(): void {
    this.ngxService.stop()
  }

  sendCode() {
    this.loading.isLoading = true;
    this.authService.resendCode(this.loading, this.resend)

  }

  onOtpChange(event: string) {
    this.value = event;
  }

  verifyAccount() {
    this.authService.verifyAccount(this.value)
  }
}
