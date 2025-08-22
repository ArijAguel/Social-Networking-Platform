import { Project } from "../Projet";
import { Remarque } from "../Remarque";

export class Etape7 {
    constructor(
        public id: number,
        public nomEntreprise: string,
        public formeJuridique: string,
        public fondateurs: string,
        public emplacements: string,
        public services: string,
        public beneficaires: string,
        public entConcurrents: string,
        public concurrents: string,
        public fournisseursPartenaires: string,
        public dateCreation: Date,
        public coutInvestissement: number,
        public chiffreAffair: number,
        public nombreEmployeHomme: number,
        public nombreEmployeFemme: number,
        public nombreEmployeMoins35: number,
        public nombreSaisonnierHomme: number,
        public nombreSaisonnierFemme: number,
        public nombreSaisonnierMoins35: number,
        public termine: number,
        public remarques: Remarque[],
        public project:Project,
    ) {}
}