import {Injectable} from '@angular/core';
import {Organization} from "../Models/Organization";
import {OrganizationApiService} from "../api/organization-api.service";
import {Router} from "@angular/router";
import {mergeMap, of} from "rxjs";
import {CloudinaryApiService} from "../api/cloudinary-api.service";
import {OrganizationProgram} from "../Models/OrganizationProgram";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private organizationApiService: OrganizationApiService, private router: Router, private cloudinaryService: CloudinaryApiService) {
  }

  create(organization: Organization, image: File | null, image2: File | null) {
    const uploadImage$ = image ? this.cloudinaryService.upload(image) : of(null)
    const uploadImage2$ = image2 ? this.cloudinaryService.upload(image2) : of(null)
    uploadImage$.pipe(
      mergeMap((data: any) => {
        if (data) {
          organization.logo = data?.url
        }
        return uploadImage2$;
      }),
      mergeMap((data: any) => {
        if (data) {
          organization.cover = data?.url
        }
        return this.organizationApiService.create(organization);
      }),
    ).subscribe((response) => {
      this.router.navigate(['/feed/organization']).then();
    })
  }

  addInvestor(id: number, idUser: number) {
    return this.organizationApiService.addInvestor(id, idUser);
  }

  addCoach(id: number, idUser: number) {
    return this.organizationApiService.addCoach(id, idUser);
  }

  addSSO(id: number, idUser: number) {
    return this.organizationApiService.addSSO(id, idUser);
  }

  removeInvestor(id: number, idUser: number) {
    return this.organizationApiService.removeInvestor(id, idUser);
  }

  removeCoach(id: number, idUser: number) {
    return this.organizationApiService.removeCoach(id, idUser);
  }

  removeSSO(id: number, idUser: number) {
    return this.organizationApiService.removeSSO(id, idUser);
  }

  findAllByUser() {
    return this.organizationApiService.findAllByUser();
  }

  delete(id: number) {
    return this.organizationApiService.delete(id);
  }

  findById(value: number) {
    return this.organizationApiService.findById(value);
  }


  createProgram(program: OrganizationProgram, idOrg: number) {
    this.organizationApiService.createProgram(program, idOrg).subscribe((response) => {
      this.router.navigate(['/feed/organization/detail'], {queryParams: {id: idOrg}});
    })
  }

  deleteProgram(selectedProgramDelete: number) {
    return this.organizationApiService.deleteProgram(selectedProgramDelete);
  }

  update(organization: Organization, image: File | null, image2: File | null) {
    const uploadImage$ = image ? this.cloudinaryService.upload(image) : of(null)
    const uploadImage2$ = image2 ? this.cloudinaryService.upload(image2) : of(null)
    uploadImage$.pipe(
      mergeMap((data: any) => {
        if (data) {
          organization.logo = data?.url
        }
        return uploadImage2$;
      }),
      mergeMap((data: any) => {
        if (data) {
          organization.cover = data?.url
        }
        return this.organizationApiService.update(organization);
      }),
    ).subscribe((response) => {
      this.router.navigate(['/feed/organization/detail'], {queryParams: {id: organization.id}});
    })
  }

  updateProgram(program: OrganizationProgram) {
    this.organizationApiService.updateProgram(program).subscribe((response) => {
        this.router.navigate(['/feed/program/detail'], {
          queryParams: {
            id: program.id
          }
        })
      }
    )
    ;
  }

  duplicateProgram(id: number, name: string) {
    return this.organizationApiService.duplicateProgram(id, name)
  }

  findByIdModify(param: any) {
    return this.organizationApiService.findByIdModify(param);
  }

  findAll() {
    return this.organizationApiService.findAll();
  }
}
