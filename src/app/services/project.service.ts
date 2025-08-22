import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {ProjectApiService} from '../api/project-api.service';
import {Project} from '../Models/Projet';
import {CloudinaryApiService} from '../api/cloudinary-api.service';
import {Router} from '@angular/router';
import {EditableService} from './editable.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects = new BehaviorSubject<Project[]>([]);
  projects$ = this.projects.asObservable()
  allProjects = new BehaviorSubject<Project[]>([]);
  allProjects$ = this.allProjects.asObservable()

  constructor(private editableService: EditableService, private router: Router, private projectApiService: ProjectApiService, private cloudinaryService: CloudinaryApiService) {

  }

  findByUser() {
    this.projectApiService.findByUser().subscribe((data) => {
      this.projects.next(data)
    })
  }
    findByCaoch() {
    this.projectApiService.findByCoach().subscribe((data) => {
      this.projects.next(data)
    })
  }
    findByInvestor() {
    this.projectApiService.findByInvestor().subscribe((data) => {
      this.projects.next(data)
    })
  }
  findProjectsByUser() {
  return   this.projectApiService.findByUser()
  }

  create(project: Project, logo: File | null, image: File | null): any {
    const logoUpload$ = this.uploadimage(logo);
    const imageUpload$ = this.uploadimage(image);
    forkJoin([logoUpload$, imageUpload$]).subscribe(
      ([logoUrl, imageUrl]) => {
        project.logo = logoUrl;
        project.image = imageUrl;
        this.projectApiService.createProject(project).subscribe(
          (data) => {
            this.editableService.setIsEditable(true)
            this.router.navigate(['feed', 'timeline', data.id]);
            return data.id;
          },
          error => {
            return 0;
          }
        );
      },
      error => {
      }
    );
  }



  uploadimage(logo: File | null): Observable<string> {
    if (logo) {
      return new Observable<string>((observer) => {
        this.cloudinaryService.upload(logo).subscribe(
          (logoData) => {
            observer.next(logoData.url);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      });
    } else {
      return of('');
    }
  }


  update(project: Project, logo: File | null, image: File | null): void {
    if(image!=null && logo!=null){
      const logoUpload$ = this.uploadimage(logo);
      const imageUpload$ = this.uploadimage(image);
      forkJoin([logoUpload$, imageUpload$]).subscribe(
        ([logoUrl, imageUrl]) => {
          project.logo = logoUrl;
          project.image = imageUrl;
          this.projectApiService.update(project).subscribe(
            (data: Project[]) => {
              this.projects.next(data);
              this.router.navigate(['/feed/my-business'])
            }

          );
        },
        error => {
        }
      );
    }else if(logo!=null){
      const logoUpload$ = this.uploadimage(logo);
      logoUpload$.subscribe(
        (logoUrl) => {
          project.logo = logoUrl;
          this.projectApiService.update(project).subscribe(
            (data: Project[]) => {
              this.projects.next(data);
              this.router.navigate(['/feed/my-business'])
            }
          );
        },
        error => {
        }
      );
    }else if(image!=null){
      const imageUpload$ = this.uploadimage(image);
      imageUpload$.subscribe(
        (imageUrl) => {
          project.image = imageUrl;
          this.projectApiService.update(project).subscribe(
            (data: Project[]) => {
              this.projects.next(data);
              this.router.navigate(['/feed/my-business'])
            }
          );
        },
        error => {
        }
      );
    }else{
      this.projectApiService.update(project).subscribe(
        (data: Project[]) => {
          this.projects.next(data);
          this.router.navigate(['/feed/my-business'])
        }
      );
    }
  }

  delete(id: number): void {
    this.projectApiService.delete(id).subscribe(
      (data: Project[]) => {
        this.projects.next(data);
      }
    );
  }

  findById(id: number): Observable<Project> {
    return this.projectApiService.findById(id);
  }

  changeVisibility(id: number): void {
    this.projectApiService.changeVisibility(id).subscribe(
      (data: Project) => {
        this.projectApiService.findByUser().subscribe((data) => {
          this.projects.next(data)

        })
      },
      error => {
      }
    );
  }

  assignCoachToProject(idproject: number, idCoach: number): void {
    this.projectApiService.assign(idproject, idCoach).subscribe(
      (data) => {
        this.projectApiService.findByUser().subscribe((data) => {
          this.projects.next(data)
        })
      },
      error => {
      }
    );
  }
  assignInvestorToProject(idproject: number, idInvestor: number): void {
    this.projectApiService.assignInvestor(idproject, idInvestor).subscribe(
      (data) => {
        this.projectApiService.findByUser().subscribe((data) => {
          this.projects.next(data)
        })
      },
      error => {
      }
    );
  }

  findAll() {
    return this.projectApiService.findAll()
  }

  getAllProjects() {
    return this.projectApiService.findAll().subscribe((data) => {
      this.allProjects.next(data)
    });
  }



  removeCoach(id: number, idBusiness: number) {
    return this.projectApiService.removeCoach(id, idBusiness);
  }
}
