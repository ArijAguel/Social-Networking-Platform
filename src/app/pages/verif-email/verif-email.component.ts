import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {UserApiService} from "../../api/user-api.service";

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent {
  constructor(private activatedRoute: ActivatedRoute, private userApi: UserApiService, private authService: AuthenticationService, private ngxService: NgxUiLoaderService,) {
    // this.ngxService.start()
    //
    // this.userApi.verifyAccount(this.activatedRoute.snapshot.queryParams['email'], this.activatedRoute.snapshot.queryParams['token']).subscribe(
    //   (response)=> {
    //     this.authService.userEmailVerified(response);
    //   }
    // )
  }
}
