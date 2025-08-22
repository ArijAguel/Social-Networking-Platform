import { Project } from "../Projet";
import { Remarque } from "../Remarque";

export class Etape3 {
    constructor(
        public id: number,
        public partenaires: string,
        public activites: string,
        public ressources: string,
        public valeurs: string,
        public relations: string,
        public distribution: string,
        public clienteles: string,
        public couts: string,
        public revenus: string,
        public termine: number,
        public remarques: Remarque[],
        public project:Project,

    ) {}
}