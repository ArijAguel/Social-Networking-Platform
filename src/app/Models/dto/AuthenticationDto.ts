import {User} from "../User";

export class AuthenticationDto {
  user:User=new User()
  token:string=""

  constructor(
    user :User = new User(),
    token:string=""
  ) {
  }
}