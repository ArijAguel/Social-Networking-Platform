import {Injectable} from '@angular/core';
import {CONSTANTS} from '../config/constant';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, Observable, tap} from 'rxjs';
import {User} from '../Models/User';
import {UpdatePaswordDto} from '../Models/dto/UpdatePawwordDto';
import {ImageUpload} from '../Models/dto/ImageUpload';
import {Router} from "@angular/router";
import {AuthenticationDto} from "../Models/dto/AuthenticationDto";
import { UserDto } from '../Models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

    private apiUrl = `${CONSTANTS.API_BASE_URL}`;

  constructor(private toaster: ToastrService, private http: HttpClient,private router :Router) { }

  hasPermission(s: string) {
    return this.http.post<boolean>(`${CONSTANTS.API_BASE_URL}/user/hasPermission`,s)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }) ,tap((data)=>{
        if(!data && s!=='INTEGRER_BUSINESS_COFONDATEUR'){
          this.router.navigate(['/pricing'])
        }
      }))
  }
  findById(id:number){
    return this.http.get<User>(`${CONSTANTS.API_BASE_URL}/user/${encodeURIComponent(id)}`)
      .pipe(catchError((err)=>{
        this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });
        return EMPTY
      }))
  }
  updateUser(user:User){
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/update`,user)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
        this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      });}
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
      closeButton: true,
        positionClass: 'toast-top-right'
    })))
  }
  changePassword(dto:UpdatePaswordDto){
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/updatePassword`,dto)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
setPhoto(dto:ImageUpload){
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/addPhoto`,dto)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  removePhoto(){
    return this.http.get<User>(`${CONSTANTS.API_BASE_URL}/user/deletePhoto`)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  changeVisibility(id:number){
    return this.http.get<any>(`${CONSTANTS.API_BASE_URL}/user/changeVisibility`)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Status updated!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  setActive(){
    return this.http.get<any>(`${CONSTANTS.API_BASE_URL}/user/active`)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Status updated!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  getRoles(){
    return this.http.get<string[]>(`${CONSTANTS.API_BASE_URL}/user/roles`)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }) )
  }
  getContacts(){
    return this.http.get<User[]>(`${CONSTANTS.API_BASE_URL}/user/contact`)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }))
  }

  getUsersByName(data: string) {
    return this.http.post<User[]>(`${CONSTANTS.API_BASE_URL}/user/name`, {'name': data})
      .pipe(catchError((err) => {
        if (err.status !== 401) {
          if(err.status !==401){
          this.toaster.error('', 'Une erreur s\'est produite!',{
            closeButton: true,
            positionClass: 'toast-top-right'
          }); }
        }
        return EMPTY
      }))
  }

  isEmailVerified() {
    return this.http.get<boolean>(`${CONSTANTS.API_BASE_URL}/user/isEmailVerified`)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }))
  }

  updateUserEducation(user:User) {
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/updateEducation`,user)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  updateUserMissions(user:User) {
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/updateMission`,user)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  updateUserCertificate(user:User) {
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/updateCertificate`,user)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  updateUserExperience(user:User) {
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/updateExperience`,user)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  updateUserTraining(user:User) {
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/updateTraining`,user)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
        this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }
  updateUserBenevolat(user:User) {
    return this.http.post<User>(`${CONSTANTS.API_BASE_URL}/user/updateBenevolat`,user)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }), tap(() => this.toaster.success('', 'Modifications sauvegardés!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      })))
  }

  validate(id: number, validated: boolean) {
    return validated? this.http.get<User>(`${CONSTANTS.API_BASE_URL}/user/validateFeature/${encodeURIComponent(id)}`)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      })): this.http.get<User>(`${CONSTANTS.API_BASE_URL}/user/unValidateFeature/${encodeURIComponent(id)}`)
      .pipe(catchError((err)=>{
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!',{
        closeButton: true,
        positionClass: 'toast-top-right'
      }); }
        return EMPTY
      }))
  }

  hasPermissionBusiness() {
    return this.http.get<boolean>(`${CONSTANTS.API_BASE_URL}/user/hasPermissionBusiness`)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Une erreur s\'est produite!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY
      }), tap((data) => {
        if (!data) {
          this.router.navigate(['/pricing'])
        }
      }))
  }

  findByEmail(searchUser: string) {
    return this.http.post<User | null>(`${CONSTANTS.API_BASE_URL}/user/email`, searchUser)
      .pipe(catchError((err) => {
        if (err.status !== 401) {
          this.toaster.error('', 'Une erreur s\'est produite!', {
            closeButton: true,
            positionClass: 'toast-top-right'
          });
        }
        return EMPTY
      }))
  }


  resendCode(loading: { isLoading: boolean }) {
    return this.http.post<any>(`${this.apiUrl}/user/resendEmailVerification`, null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Error Occured!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        loading.isLoading = false;
        return EMPTY;
      }), tap(() => this.toaster.success('', 'Code Sent!', {
        closeButton: true,
        positionClass: 'toast-top-right'
      })));
  }

  verifyAccount(code: string): Observable<any> {
    return this.http.post<AuthenticationDto>(`${this.apiUrl}/user/verifyAccount?code=${encodeURIComponent(code)}`, null)
      .pipe(catchError((err) => {
        this.toaster.error('', 'Account verification failed!', {
          closeButton: true,
          positionClass: 'toast-top-right'
        });
        return EMPTY;
      }));
  }
  searchByEmail(email: string) {
    return this.http.get<UserDto[]>(`${CONSTANTS.API_BASE_URL}/user/search?email=${email}`);
  }

}
