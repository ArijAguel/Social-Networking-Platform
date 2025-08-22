import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {CONSTANTS} from '../config/constant';
import {User} from "../Models/User";
import {Coach} from "../Models/Coach"; // Assuming you have a model named CoachDto

@Injectable({
  providedIn: 'root'
})
export class CoachApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/coach`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred while fetching entrepreneurs!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });}
        return EMPTY;
      }));
  }


  // findAllinAll(): Observable<Coach[]> {
  //   return this.http.get<Coach[]>(`${this.apiUrl}/allinall`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while fetching coaches in all!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // findAllInvestisseur(): Observable<Coach[]> {
  //   return this.http.get<Coach[]>(`${this.apiUrl}/allInvestisseur`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while fetching investor coaches!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // findAllSso(): Observable<Coach[]> {
  //   return this.http.get<Coach[]>(`${this.apiUrl}/allSso`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while fetching SSO coaches!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // findById(id: number): Observable<Coach> {
  //   return this.http.get<Coach>(`${this.apiUrl}/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while fetching coach details!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // deleteProfilePicture(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/deletePhoto/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while deleting the profile picture!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // update(user: Coach): Observable<Coach> {
  //   return this.http.post<Coach>(`${this.apiUrl}/update`, user)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while updating coach details!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // countProjects(id: number): Observable<number> {
  //   return this.http.get<number>(`${this.apiUrl}/count/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while counting projects!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // getContacts(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/contact/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while fetching contacts!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // getInbox(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/inbox/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while fetching inbox!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // delete(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/delete/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while deleting the coach!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // updatePassword(dto: any /*UpdatePasswordDto*/): Observable<Coach> { /* verfiir*/
  //   return this.http.post<Coach>(`${this.apiUrl}/updatePassword`, dto)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while updating password!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // askVerification(id: number): Observable<Coach> {
  //   return this.http.get<Coach>(`${this.apiUrl}/askVerification/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while asking for verification!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // changeVisibility(id: number): Observable<Coach> {
  //   return this.http.get<Coach>(`${this.apiUrl}/changeVisibility/${id}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while changing visibility!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  // evaluate(id: number, note: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/evaluate/${id}/${note}`)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while evaluating!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }
  //
  becomeCoach(coach : Coach): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/becomeCoach`,coach)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  //
  // addProfessionalForm(professionalForm: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/professional-form`, professionalForm)
  //     .pipe(catchError((err) => {
  //       this.toaster.error('', 'An error occurred while adding professional form!',{
  //         closeButton: true,
  //         positionClass: 'toast-top-right'
  //       });
  //       return EMPTY;
  //     }));
  // }


  findAllPage(page: number) {
    return this.http.get<User[]>(`${this.apiUrl}/all?paginate=true&page=${encodeURIComponent(page)}`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
          this.toaster.error('', 'An error occurred while fetching entrepreneurs!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }
        return EMPTY;
      }));
  }
}
