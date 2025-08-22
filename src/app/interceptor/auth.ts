import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {getItem} from "../utils/localStorage";
import {CONSTANTS} from "../config/constant";
import {Router} from "@angular/router";

@Injectable()
export class Auth implements HttpInterceptor {
  constructor(private router:Router) {
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf("api/v1/auth") !== -1 || request.url === CONSTANTS.CLOUDINARY_URL|| request.url === "https://restcountries.com/v3.1/all") {
      return next.handle(request);
    }

    const token = getItem("user")?.token;

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }

    // Add withCredentials and headers to the cloned request
    request = request.clone({ headers, withCredentials: true });


    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/pricing'])
        }
        return throwError(error);
      })
    );
  }
}
