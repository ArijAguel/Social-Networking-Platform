import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CONSTANTS} from '../config/constant';
import {Project} from '../Models/Projet';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {
  private apiUrl = `${CONSTANTS.API_BASE_URL}`;

  constructor(private toaster: ToastrService, private http: HttpClient) { }

  findByUser(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/BusinessAsEntrepreneur`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching projects by entrepreneur!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  findByCoach(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/BusinessAscoach`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching projects by entrepreneur!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  findByInvestor(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/BusinessAsInvestor`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching projects by entrepreneur!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  findPublicProjects(page: number, size: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/publicProjects/${encodeURIComponent(page)}/${encodeURIComponent(size)}`)
      .pipe(catchError((err) => {


        if (err.status !== 401) {
        this.toaster.error('', 'An error occurred while fetching public projects',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });  }
        return EMPTY;
      }));
  }



  findAll(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/project/all`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching projects by entrepreneur!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }

  findById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/project/${encodeURIComponent(id)}` )
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while fetching project by ID!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }));
  }
  isMyProject(idProject: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/project/ismyproject/${encodeURIComponent(idProject)}`);
  }

  findById2(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/project/${encodeURIComponent(id)}` )
  }
  createProject(project: Project):Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/project/create`, project).pipe(catchError((err) => {
      this.toaster.error('Error', 'An error occurred while creating a project!', {
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY
      }),tap(() => this.toaster.success('', 'Project created successfully !',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }




  update(project: Project): Observable<Project[]> {
    return this.http.post<Project[]>(`${this.apiUrl}/project/update`, project)
  }

  assign(idProjet: number, idCoach: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/assign/coach/${encodeURIComponent(idProjet)}/${encodeURIComponent(idCoach)}`, {})
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while assigning coach to project!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),tap(() => this.toaster.success('', 'Professional has been assigned to professional',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })));
  }

  assignInvestor(idProjet: number, idInvestor: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/assign/investor/${encodeURIComponent(idProjet)}/${encodeURIComponent(idInvestor)}`, {})
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while assigning Investor to project!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),tap(() => this.toaster.success('', 'Investor has been assigned to Project',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })));
  }
  changeVisibility(idProject: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/visibility/${encodeURIComponent(idProject)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred changing visibility project!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),tap(() => this.toaster.success('', 'Visibility of your project Changed!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })));
  }

  delete(idProject: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/project/delete/${encodeURIComponent(idProject)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred while deleting project!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY;
      }),tap(() => this.toaster.success('', 'Project deleted successfully!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })));
  }


  removeCoach(id: number, idBusiness: number) {
    return this.http.get<void>(`${this.apiUrl}/project/removeCoach/${encodeURIComponent(idBusiness)}/${encodeURIComponent(id)}`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'An error occurred changing visibility project!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }), tap(() => this.toaster.success('', 'Professional removed successfully', {
        closeButton: true,
        positionClass: 'toast-top-right'
      })));
  }
}
