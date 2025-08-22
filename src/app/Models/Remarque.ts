import { Coach } from "./Coach";
import { User } from "./User";

export class Remarque {
    id: number = 0;
    etapeId: number=0;
    rubrique: string="";
    user:User=new User();
    remarque: string="";
    etat: string="";
    raison: string="";
    myPost: boolean=false;





    constructor()
    {}
}