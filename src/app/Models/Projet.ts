import {User3} from "./User";

export class Project {
    id: number = 0;
    creationDate: string = '';
    description: string = '';
    name: string = '';
    phoneNumber: string = '';
    status: number = 0;
    logo: string = '';
    image: string = '';
    videoURL: string = '';
    [key: string]: any;
    validity: boolean = false;
    learnBusiness: boolean = false;
    publique: boolean = false;
    entrepreneurDtos:  User3[] = [];
    coFounders:  User3[] = [];
  coaches: User3[] = [];
    entrepreneur!:  User3;
    investors:  User3[] = [];
    ids: number[] = [];
    coFoundersId:number[] = [];
    constructor() {}
}
