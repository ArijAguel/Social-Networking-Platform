import { Role } from "./Enums/Role";

export class UserDto {
    constructor(
        public id: number,
        public nom : String,
        public prenom : String,
        public email: String ,
        public dateNaissance : Date,
        public photo : String,
        public  linkedinLink : String,
        public  emailVerif :String,
        public  phone : number,
        public  role : Role ,
        public  requestVerification: Boolean,
        public  lastLogin:Date,
        public  lastLogout:Date,
        public  verified:boolean,
        public  creationDate:Date,
        public  prive:boolean,
        public  phoneNumber:String,

    ) {}
}