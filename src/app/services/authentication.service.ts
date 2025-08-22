import {Injectable} from '@angular/core';
import {User} from '../Models/User';
import {BehaviorSubject, map, of, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';
import {LoginDto} from '../Models/dto/LoginDto';
import {getItem, removeItem, setItem} from '../utils/localStorage';
import {AuthenticationAPIService} from '../api/auth-api.service';
import {NotificationService} from "./notification.service";
import {jwtDecode} from "jwt-decode";
import {MessageNotificationService} from "./message-notification.service";
import {UserApiService} from "../api/user-api.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedIn = new BehaviorSubject<User | null>(null)
  loggedIn$ = this.loggedIn.asObservable()
  isLoggedIn$ = this.loggedIn$.pipe(map((user) => !!user))
  isEmailVerified = new BehaviorSubject<boolean | null>(null)
  isEmailVerified$ = this.isEmailVerified.pipe(tap(() => this.ngxService.start()), switchMap((data) => data != null ? of(data) : this.userApiService.isEmailVerified()), tap(() => this.ngxService.stop()))

  constructor(private loginApi: AuthenticationAPIService, private userApi: UserApiService, private ngxService: NgxUiLoaderService, private userApiService: UserApiService, private router: Router, private notificationService: NotificationService, private messageNotifService: MessageNotificationService) {
    if (!this.isTokenValid()) {
      removeItem("user")
    }
    if (this.isAuthenticated()) {
      this.loggedIn.next(getItem("user"))

    } else {
      this.loggedIn.next(null)
    }


  }

  isTokenValid() {
    return getItem("user") && getItem("user").token && Date.now() < (parseInt(String(jwtDecode(getItem("user").token).exp)) * 1000);
  }

  register(user: User) {
    this.ngxService.start()
    this.loginApi.register(user).subscribe((response) => {
      this.loggedIn.next(response.user);
      setItem("user", {...response.user, token: response.token});
      // ! original
      this.isEmailVerified.next(false)
      // this.isEmailVerified.next(true)
      // ! original
      this.router.navigate(["/email-verification"]);
      // this.router.navigate(["/feed"]);
    })
  }

  login(loginDto: LoginDto) {
    this.ngxService.start()
    this.loginApi.login(loginDto).subscribe((response) => {
      if (response.user.emailVerif != null) {
        this.loggedIn.next(response.user);
        setItem("user", {...response.user, token: response.token});
        this.isEmailVerified.next(false)
        this.router.navigate(["/email-verification"]);
      } else {
        this.loggedIn.next(response.user);
        setItem("user", {...response.user, token: response.token});
        this.isEmailVerified.next(true)
        this.router.navigate(["feed"])
        this.notificationService.getNotifications()
      }
    })
  }

  logout() {
    this.router.navigate(["login"])
    localStorage.clear();
    sessionStorage.clear();
    this.loggedIn.next(null);
    this.notificationService.closeWebSocket()
    this.messageNotifService.closeWebSocket()
  }

  isAuthenticated() {
    return getItem("user") !== null
  }


  resendCode(loading: { isLoading: boolean }, resend: { wait: boolean, waitingTime: number }) {
    this.userApiService.resendCode(loading).subscribe(() => {
      loading.isLoading = false;
      resend.wait = true;
      const int = setInterval(() => {
        resend.waitingTime--;
      }, 1000);
      setTimeout(() => {
        clearInterval(int);
        resend.waitingTime = 60;
        resend.wait = false;
      }, 60000);
    });
  }

  userEmailVerified(response: any) {
    this.loggedIn.next(response.user);
    setItem("user", {...response.user, token: response.token});
    this.isEmailVerified.next(true)
    this.router.navigate(["feed"])
    this.ngxService.stop()
    this.notificationService.getNotifications()
  }

  verifyAccount(value: string) {

    this.userApi.verifyAccount(value).subscribe(
      (response) => {
        this.ngxService.start()
        this.userEmailVerified(response);
      }
    )
  }
}
