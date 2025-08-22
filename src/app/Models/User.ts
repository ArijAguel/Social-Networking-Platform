import {Coach} from "./Coach";
import {Entrepreneur} from "./Entrepreneur";
import {Investisseur} from "./investisseur";
import {Sso} from "./ssso";
import {Message} from "./Message";
import {Feed} from "./Feed";
import {Rating} from "./Rating";

export class User {
  subscribe(arg0: (user: any) => void) {
    throw new Error('Method not implemented.');
  }
  id: number = 0;
  nom: string = "";
  prenom: string = "";
  cover: string = "";
  email: string = "";
  dateNaissance: Date = new Date();
  password: string = "";
  bio: string = "";
  photo: string = "";
  instagram: string = "";
  linkedinLink: string = "";
  facebook: string = "";
  xTwitter: string = "";
  emailVerif: string = "";
  phone: number = 0;
  phon52: number = 0; // Assuming phon52 is a separate field in the backend
  requestVerification: boolean = false;
  lastLogin: Date = new Date(); // Assuming you want to store this as a Date in the frontend
  lastLogout: Date = new Date(); // Assuming you want to store this as a Date in the frontend
  verified: boolean = false;
  active: boolean = false;
  connected: boolean = false;
  sentRequest: boolean = false;
  creationDate: Date = new Date(); // Assuming you want to store this as a Date in the frontend
  prive: boolean = false;
  phoneNumber: string = "";
  country: string = "";
  adresse: string = "";
  state: string = "";
  roles: string[] = [];
  feeds: Feed[] = [];
  token: string = "";
  recaptchaToken: string = "";
  note: number = 0;
  reviews: number = 0;
  sso: Sso | null = null; // Assuming SSODto, CoachDto, EntrepreneurDto, and InvestisseurDto are defined elsewhere
  coach: Coach | null = null;
  entrepreneur: Entrepreneur | null = null;
  investisseur: Investisseur | null = null;

  jobTitle: string = "";
  skills: string[] = [];
  educations: Education[] = [];
  experiences: Experience[] = [];
  certificates: Certification[] = [];
  trainings: Training[] = [];
  benevolats: Benevolat[] = [];
  missions: Mission[] = [];
  ratings: Rating[] = [];


  canReceiveMessages: boolean = false;
  canReceiveNotifications: boolean = false;
  canReceiveConnections: boolean = false;
  canReceiveInvestmentRequests: boolean = false;
  canReceiveInterventionRequests: boolean = false;


  constructor() {
  }
}

export class User2 {
  id: number = 0;
  nom: string = "";
  prenom: string = "";
  cover: string = "";
  email: string = "";
  dateNaissance: Date = new Date();
  password: string = "";
  bio: string = "";
  photo: string = "";
  message: Message = new Message();
  active: boolean = false;
}
export class User3 {
  id: number = 0;
  nom: string = "";
  prenom: string = "";
  email: string = "";
  photo: string = "";
  phoneNumber: string = "";
}

export class Education {
  id: number = 0;
  degree: string = "";
  specialty: string = "";
  university: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
  onProgress:boolean=false;
  validated:boolean=false;
}

export class Experience {
  id: number = 0;
  title: string = "";
  description: string = "";
  workplace: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
  onProgress:boolean=false;
  validated:boolean=false;
}

export class Certification {
  id: number = 0;
  certificate: string = "";
  organization: string = "";
  date: Date = new Date();
  validated:boolean=false;
}

export class Training {
  id: number = 0;
  subject: string = "";
  organisation: string = "";
  numberOfHours: number = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  onProgress:boolean=false;
  validated:boolean=false;
}

export class Benevolat {
  id: number = 0;
  title: string = "";
  organisation: string = "";
  description: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
  onProgress:boolean=false;
  validated:boolean=false;
}

export class Mission {
  id: number = 0;
  title: string = "";
  client: string = "";
  description: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
 onProgress:boolean=false;
 validated:boolean=false;
}
