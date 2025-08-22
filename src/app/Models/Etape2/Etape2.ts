import { Project } from "../Projet";
import { Remarque } from "../Remarque";
import { Acteur } from "./Acteur";
import { Besoin } from "./Besoin";
import { Champ } from "./Champ";
import { RessourceFinanciere } from "./RessourceFinanciere";
import { RessourceImmaterielle } from "./RessourceImmaterielle";
import { RessourceMaterielle } from "./RessourceMaterielle";

export class Etape2 {
    constructor(
        public id: number,
        public capacitesTechniques: string,
        public lacunesTechniques: string,
        public actionsTechniques: string,
        public capacitesSoft: string,
        public lacunesSoft: string,
        public actionsSoft: string,
        public project:Project,
        public capacitesPersonnelles: string,
        public lacunesPersonnelles: string,
        public actionsPersonnelles: string,
        public capacitesProfessionnelles: string,
        public lacunesProfessionnelles: string,
        public actionsProfessionnelles: string,
        public idee1: string,
        public idee2: string,
        public idee3: string,
        public conclusion: string,
        public termine: number,
        public ressourcesFinancieres: RessourceFinanciere[],
        public ressourcesMaterielles: RessourceMaterielle[],
        public ressourcesImmaterielles: RessourceImmaterielle[],
        public besoins: Besoin[],
        public champs: Champ[],
        public acteurs: Acteur[],
        public remarques: Remarque[]
    ) {}
}