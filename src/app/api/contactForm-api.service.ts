import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../config/constant';
import { Coach } from '../Models/Coach';
import {User} from "../Models/User"; // Assuming you have a model named CoachDto
import { ContactForm } from '../Models/contactForm';

@Injectable({
  providedIn: 'root'
})
export class ContactFormApiService {
    private apiUrl = `${CONSTANTS.API_BASE_URL}/contactForm`;

    constructor(private toaster: ToastrService, private http: HttpClient) { }

    sendContactForm(contactForm: ContactForm): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/send`, contactForm)
        .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while sending contact form!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
        }));
    }
}
