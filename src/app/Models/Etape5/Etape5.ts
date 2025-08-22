import { Project } from "../Projet";
import { Remarque } from "../Remarque";
import { Fonds } from "./Fonds";
import { Fournisseur } from "./Fournisseur";
import { Infrastructure } from "./Infrastructure";
import { Partenaire } from "./Partenaire";

export class Etape5 {
    constructor(
        public id: number,
        public productService: string,
        public process: string,
        public quality: string,
        public humanResources: string,
        public resourceRequirements: string,
        public supplyChain: string,
        public risqueManagement: string,
        public timelineMileStone: string,
        public compliance: string,
        public periodDeFonds: number,
        public termine: number,
        public fraisEtablissement: number,
        public terrain: number,
        public genieCivil: number,
        public elementIncorporels: number,
        public amenagement: number,
        public equipementProduction: number,
        public materielTransport: number,
        public mobilier: number,
        public divers: number,
        public fondRoulement: number,
        public capital: number,
        public promoteur: number,
        public foprodi: number,
        public fournisseurs: Fournisseur[],
        public fonds: Fonds[],
        public ownerCapital: number,
        public partenaires: Partenaire[],
        public infrastructures: Infrastructure[],
        public remarques: Remarque[],
        public project:Project,

    ) {}
}