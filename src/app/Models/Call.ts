export class Call{
  id: number = 0;
  titre: string = '';
  categorie: string = '';
  creationDate: Date = new Date();
  lastModifiedDate: Date = new Date();
  country: string = '';
  description: string = '';
  image: string = '';
  startDate: string = '';
  endDate: string = '';
  place: string = '';
  howToApply: string = '';
  visibility: boolean = true;
  organizerType: string = 'user';
  organizerId: number = 0;
  application_deadline : Date = new Date();
  organizer: any = {};
}
