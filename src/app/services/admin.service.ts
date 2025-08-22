import { Injectable } from '@angular/core';
import {EntrepreneurApiService} from "../api/entrepreneur-api.service";
import {CoachApiService} from "../api/coach-api.service";
import { AdminApiService } from '../api/admin-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CodePromo } from '../Models/CodePromo';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  Users= new BehaviorSubject<any[]>([]);
  Users$ = this.Users.asObservable()

  codePromo= new BehaviorSubject<CodePromo[]>([]);
  codePromo$ = this.codePromo.asObservable()

  constructor( private adminApiService: AdminApiService,private toaster:ToastrService) {
  }
  findALl(){
    return this.adminApiService.getAllUsers().subscribe((data)=>{
      this.Users.next(data)
    });
  }
  verify(id:number){
    return this.adminApiService.verify(id).subscribe(
    () => {
      this.toaster.success('', 'Verification of user done !',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      this.findALl();

    },
    (error) => {
      this.toaster.error('', 'An error occurred while verifing the user!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
    }
    )
  }
  unVerify(id:number){
    return this.adminApiService.unVerify(id).subscribe(
    () => {
      this.toaster.success('', 'Unverification of user done !',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      this.findALl();
    },
    (error) => {
      this.toaster.error('', 'An error occurred while Unverifing the user!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
    }
  );
  }
  deleteUser(id:number){
    return this.adminApiService.delete(id).subscribe(
    () => {
      this.toaster.success('', 'User deleted successfully!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      this.findALl();
    },
    (error) => {
      this.toaster.error('', 'An error occurred while deleting user!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
    }
  );
  }
  findALlPromo(){
    return this.adminApiService.getAllPromo().subscribe((data)=>{
      this.codePromo.next(data)
    });
  }
  addPromo(promo:CodePromo){
    return this.adminApiService.addPromo(promo).subscribe(
    () => {
      this.toaster.success('', 'Code Promo added successfully!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      this.findALlPromo();
    },
    (error) => {
      this.toaster.error('', 'An error occurred while adding Code Promo!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
    }
  );
  }
  deletePromo(id:number){
    return this.adminApiService.deletePromo(id).subscribe(
    () => {
      this.toaster.success('', 'Code Promo deleted successfully!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
      this.findALlPromo();
    },
    (error) => {
      this.toaster.error('', 'An error occurred while deleting Code Promo!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
    })
  }
}
