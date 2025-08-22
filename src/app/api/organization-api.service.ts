import {Injectable} from '@angular/core';
import {CONSTANTS} from "../config/constant";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {Organization} from "../Models/Organization";
import {OrganizationProgram} from "../Models/OrganizationProgram";
import {ProgramApplication} from "../Models/ProgramApplication";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class OrganizationApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}/organization`;

  constructor(private toaster: ToastrService, private http: HttpClient, private location: Location) {
  }

  addInvestor(id:number,idUser:number){
    return this.http.post<Organization>(`${this.apiUrl}/addInvestor/${encodeURIComponent(id)}/${encodeURIComponent(idUser)}`,null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }) );
  }
  addCoach(id:number,idUser:number){
    return this.http.post<Organization>(`${this.apiUrl}/addCoach/${encodeURIComponent(id)}/${encodeURIComponent(idUser)}`,null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }) );
  }
  addSSO(id:number,idUser:number){
    return this.http.post<Organization>(`${this.apiUrl}/addSSO/${encodeURIComponent(id)}/${encodeURIComponent(idUser)}`,null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }) );
  }
  removeInvestor(id:number,idUser:number){
    return this.http.post<Organization>(`${this.apiUrl}/removeInvestor/${encodeURIComponent(id)}/${encodeURIComponent(idUser)}`,null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }) );
  }
  removeCoach(id:number,idUser:number){
    return this.http.post<Organization>(`${this.apiUrl}/removeCoach/${encodeURIComponent(id)}/${encodeURIComponent(idUser)}`,null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }) );
  }
  removeSSO(id:number,idUser:number){
    return this.http.post<Organization>(`${this.apiUrl}/removeSSO/${encodeURIComponent(id)}/${encodeURIComponent(idUser)}`,null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }) );
  }
  create(organization: Organization) {
    return this.http.post<Organization>(`${this.apiUrl}/create`,organization)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY;
      }),tap(() => {
        this.toaster.success('', 'Organization created successfully!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      }));
  }

  findAllByUser() {
    return this.http.get<Organization[]>(`${this.apiUrl}`)
    .pipe(catchError((err) => {
      this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      return EMPTY;
    }));
  }

  findAllPublic(page: number, size: number) {
    return this.http.get<Organization[]>(`${this.apiUrl}/public/${encodeURIComponent(page)}/${encodeURIComponent(size)}`)
    .pipe(catchError((err) => {

      if (err.status !== 401) {
      this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
      return EMPTY;
    }));
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${encodeURIComponent(id)}`)
    .pipe(catchError((err) => {
      this.toaster.error('', 'An error occurred !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      return EMPTY;
    }),tap(() => {
      this.toaster.success('', 'Organization deleted successfully!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
    }));
  }

  findById(value: number) {

    return this.http.get<Organization>(`${this.apiUrl}/${encodeURIComponent(value)}`)
      .pipe(catchError((err) => {
        this.toaster.error(err.error.message, err.error.errors[0], {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  createProgram(program: OrganizationProgram, idOrg: number) {
    return this.http.post<Organization>(`${this.apiUrl}/program/create/${encodeURIComponent(idOrg)} `, program)
        .pipe(catchError((err) => {
          this.toaster.error('', 'An error occurred  !');
          return EMPTY;
        }), tap(() => {
          this.toaster.success('', 'Program created successfully!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }));
  }

  getProgramById(param: number) {
    return this.http.get<OrganizationProgram>(`${this.apiUrl}/program/detail/${encodeURIComponent(param)}`)
      .pipe(catchError((err) => {
        this.toaster.error(err.error.message, err.error.errors[0], {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));

  }

  getAllPrograms() {
    return this.http.get<OrganizationProgram[]>(`${this.apiUrl}/program/public`)
      .pipe(catchError((err) => {

        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
        return EMPTY;
      }));
  }
  apply(application:ProgramApplication) {
    return this.http.post<void>(`${this.apiUrl}/program/programApplication/create`,application)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),tap(() => {
          this.toaster.success('', 'Your application has been received!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      }));
  }
  acceptApplication(id:number) {
    return this.http.get<ProgramApplication[]>(`${this.apiUrl}/program/programApplication/accept/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  declineApplication(id:number) {
    return this.http.get<ProgramApplication[]>(`${this.apiUrl}/program/programApplication/decline/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  getAllbyProgram(id:number) {
    return this.http.get<ProgramApplication[]>(`${this.apiUrl}/program/programApplication/program/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  deleteProgram(param: number) {
    return this.http.delete<void>(`${this.apiUrl}/program/delete/${encodeURIComponent(param)}`)
      .pipe(catchError((err) => {
        this.toaster.error(err.error.message, err.error.errors[0], {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }))
  }

  update(organization: Organization) {
    return this.http.put<Organization>(`${this.apiUrl}/update`,organization)
      .pipe(catchError((err) => {
        this.toaster.error(err.error.message, err.error.errors[0], {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),tap(() => {
        this.toaster.success('', 'Organization created successfully!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      }));
  }

  updateProgram(program: OrganizationProgram) {
    return this.http.post<Organization>(`${this.apiUrl}/program/update`, program)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !');
        return EMPTY;
      }));
  }

  duplicateProgram(id: number, name: string) {
    return this.http.get<ProgramApplication[]>(`${this.apiUrl}/program/duplicate/${encodeURIComponent(id)}?name=${encodeURIComponent(name)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred  !', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));

  }

  findByIdModify(param: any) {
    return this.http.get<Organization>(`${this.apiUrl}/modify/${param}`)
      .pipe(catchError((err) => {
        this.toaster.error(err.error.message, err.error.errors[0], {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }

  findAll() {
    return this.http.get<Organization[]>(`${this.apiUrl}/all`)
      .pipe(catchError((err) => {

        if (err.status !== 401) {
          this.toaster.error('', 'An error occurred  !', {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }
        return EMPTY;
      }));
  }
  isMyOrganization(idProject: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/ismyorg/${encodeURIComponent(idProject)}`);
  }
}
