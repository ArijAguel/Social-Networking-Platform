import {EventEmitter, Injectable} from '@angular/core';
import {UserApiService} from '../api/user-api.service';
import {User} from '../Models/User';
import {getItem, setItem} from '../utils/localStorage';
import {AuthenticationService} from './authentication.service';
import {UpdatePaswordDto} from '../Models/dto/UpdatePawwordDto';
import {CloudinaryApiService} from '../api/cloudinary-api.service';
import {BehaviorSubject, mergeMap, of} from 'rxjs';
import {ImageUpload} from '../Models/dto/ImageUpload';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private userApiService: UserApiService, private router: Router, private cloudinaryService: CloudinaryApiService,   private login: AuthenticationService) {
  }
  getLoggedUser() {
    return getItem('user')
  }

  hasPermission(permission: string) {
    return this.userApiService.hasPermission(permission);

  }

  updateUser(user: User, image: File | null, image2: File | null) {
    const uploadImage$ = image ? this.cloudinaryService.upload(image) : of(null)
    const uploadImage2$ = image2 ? this.cloudinaryService.upload(image2) : of(null)
    uploadImage$.pipe(
      mergeMap((data: any) => {
        if (data) {
          user.photo = data?.url
        }
        return uploadImage2$;
      }),
      mergeMap((data: any) => {
        if (data) {
          user.cover = data?.url
        }
        return this.userApiService.updateUser(user);
      }),
    ).subscribe((response) => {
      if (response.id == this.getLoggedUser().id) {
        let user1 = response
        user1.token = getItem('user').token
        setItem("user", user1);
        this.login.loggedIn.next(user1);
      }
    })
  }

  updatePassword(dto
                   :
                   UpdatePaswordDto
  ) {
    this.userApiService.changePassword(dto).subscribe((data) => {
    })
  }

  setCurrentUserPhoto(id
                        :
                        number, image
                        :
                        File | null, event
                        :
                        EventEmitter<any>
  ) {
    if (id != 0) {
      const uploadImage$ = image
        ? this.cloudinaryService.upload(image)
        : of(null)
      uploadImage$.pipe(mergeMap((data) => {
        let dto = new ImageUpload()
        dto.photo = data?.url

        return this.userApiService.setPhoto(dto)
      })).subscribe(
        (data) => {
          let user: User = data
          user.token = this.getLoggedUser().token
          setItem('user', user)
          this.login.loggedIn.next(user)
          event.emit(data.photo)
          this.router.navigate(['profile']);
        }
      )
    }
  }

  removeCurrentUserPhoto(id
                           :
                           number, event
                           :
                           EventEmitter<any>
  ) {
    this.userApiService.removePhoto().subscribe(
      (data) => {
        let user: User = data
        user.token = this.getLoggedUser().token
        setItem('user', user)
        this.login.loggedIn.next(user)
        this.router.navigate(['profile']);
      }
    )
  }

  changeVisibility(id
                     :
                     number
  ) {
    this.userApiService.changeVisibility(id).subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }

  setActive() {
    this.userApiService.setActive().subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }

  getRoles() {
    return this.userApiService.getRoles();
  }

  findById(id: number) {
    return this.userApiService.findById(id);
  }

  getUsersByName(data: string) {
    return this.userApiService.getUsersByName(data);
  }

  updateUserEducation(user: User) {
    this.userApiService.updateUserEducation(user).subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }

  updateUserTraining(user: User) {
    this.userApiService.updateUserTraining(user).subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }

  updateUserCertificate(user: User) {
    this.userApiService.updateUserCertificate(user).subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }

  updateUserExperience(user: User) {
    this.userApiService.updateUserExperience(user).subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }

  updateUserBenevolat(user: User) {
    this.userApiService.updateUserBenevolat(user).subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }

  updateUserMission(user: User) {
    this.userApiService.updateUserMissions(user).subscribe((data) => {
      let user = data;
      user.token = this.getLoggedUser().token
      this.login.loggedIn.next(user)
      setItem("user", user)
    })
  }
}
