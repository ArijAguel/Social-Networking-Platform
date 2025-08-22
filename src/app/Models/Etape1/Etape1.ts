import { Project } from "../Projet";
import { Remarque } from "../Remarque";
import { Beneficiare } from "./Beneficaire";
import { Objectif } from "./Objectif";
import { Valeur } from "./Valeur";
import { VeilleGlobal } from "./VeilleGlobal";

export class Etape1 {
    constructor(
        public id: number,
        public situationActuelle: string,
        public avantages: string,
        public defaillances: string,
        public termine: number,
        public tendanceEnvironnement: string,
        public ressources: string,
        public lois: string,
        public axes: string,
        public nomMission: string,
        public vision: string,
        public competences: boolean,
        public concordance: boolean,
        public impact: boolean,
        public activite: boolean,
        public project:Project,
        public beneficiares: Beneficiare[],
        public objectifs: Objectif[],
        public valeurs: Valeur[],
        public veilleGlobals: VeilleGlobal[],
        public remarques: Remarque[],
        public materialize: boolean,
        public ambitious: boolean,
        public lives: boolean,
    ) {}
}
