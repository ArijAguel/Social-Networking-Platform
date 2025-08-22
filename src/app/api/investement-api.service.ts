// import {Injectable} from '@angular/core';
// import {CONSTANTS} from '../config/constant';
// import {ToastrService} from 'ngx-toastr';
// import {HttpClient} from '@angular/common/http';
// import {catchError, EMPTY, tap} from "rxjs";
// import {Investment} from "../pages/dashboard/investor/investment-portfolio/investment-portfolio.component";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class InvestementApiService {
//   private apiUrl = `${CONSTANTS.API_BASE_URL}/investment`;
//
//   constructor(private toaster: ToastrService, private http: HttpClient) { }
//
//   getAllPortfolio(): any {
//     return this.http.get<any>(`${this.apiUrl}/portfolio`)
//   }
//
//   addInvestment(investment: Investment): any {
//     return this.http.post<any>(`${this.apiUrl}/portfolio/add-investment`, investment).pipe(catchError((err) => {
//
//       if (err.status !== 401) {
//         this.toaster.error('', 'An error occurred!', {
//           closeButton: true,
//           positionClass: 'toast-top-right'
//         });
//       }
//       return EMPTY;
//     }), tap(() => this.toaster.success('', 'Investment added successfully!')));
//   }
//
//   deleteInvestment(id: number): any {
//     return this.http.delete<any>(`${this.apiUrl}/portfolio/delete-investment/${encodeURIComponent(id)}`)
//   }
//
//   updateInvestment(investment: any): any {
//     return this.http.post<any>(`${this.apiUrl}/portfolio/update-investment`, investment)
//   }
//
//   getAllApplications(): any {
//     return this.http.get<any>(`${this.apiUrl}/applications`)
//   }
//
//   apply(investmentApplication: any): any {
//     return this.http.post<any>(`${this.apiUrl}/applications/apply`, investmentApplication).pipe( catchError((err)=>{
//       this.toaster.info('', 'Your application was already sent!');
//       return EMPTY
//     }),tap(() => this.toaster.success('', 'Your application was sent!',{
//         closeButton: true,
//         positionClass: 'toast-top-right'
//       })))
//   }
//
//   updateApplication(investmentApplication: any): any {
//     return this.http.post<any>(`${this.apiUrl}/applications/update`, investmentApplication)
//   }
//
//   deleteApplication(id: number): any {
//     return this.http.delete<any>(`${this.apiUrl}/applications/delete/${encodeURIComponent(id)}`)
//   }
//
//   getAllProgramJoinApplications(): any {
//     return this.http.get<any>(`${this.apiUrl}/program-join-application/all`)
//   }
//
//   inviteProgramJoinApplication(programJoinApplication: any): any {
//     return this.http.post<any>(`${this.apiUrl}/program-join-application/invite`, programJoinApplication).pipe( catchError((err)=>{
//       this.toaster.info('', 'Your application was already sent!',{
//         closeButton: true,
//         positionClass: 'toast-top-right'
//       });
//       return EMPTY
//     }),tap(() => this.toaster.success('', 'Your application was sent!',{
//         closeButton: true,
//         positionClass: 'toast-top-right'
//       })))
//   }
//
//   updateProgramJoinApplication(programJoinApplication: any): any {
//     return this.http.post<any>(`${this.apiUrl}/program-join-application/update`, programJoinApplication)
//   }
//
//   deleteProgramJoinApplication(id: number): any {
//     return this.http.delete<any>(`${this.apiUrl}/program-join-application/delete/${encodeURIComponent(id)}`)
//   }
//
//
//
//
// }
