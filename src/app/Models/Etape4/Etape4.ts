import { Project } from "../Projet";
import { Remarque } from "../Remarque";
import { Competitor } from "./Competitor";
import { Marketing } from "./Marketing";
import { MarketingObjectivs } from "./MarketingObjectivs";
import { Pestel } from "./Pestel";
import { Produit } from "./Produit";

export class Etape4 {
    constructor(
        public id: number,
        public descriptionProduit: string,
        public marcheCible: string,
        public politiquePrix: string,
        public forces: string,
        public faiblesses: string,
        public opportunites: string,
        public menaces: string,
        public positionnement: string,
        public concurrentiel: string,
        public oppMenaces: string,
        public product: string,
        public price: string,
        public place: string,
        public promotion: string,
        public people: string,
        public process: string,
        public physical: string,
        public size: string,
        public advantages: string,
        public positioning: string,
        public quelImpact: string,
        public termine: number,
        public chiffreAfaire: number,
        public pestel: Pestel[],
        public produits: Produit[],
        public competitors: Competitor[],
        public marketings: Marketing[],
        public marketingobjectivs: MarketingObjectivs[],
        public objectifMarketing: boolean,
        public longTerme: boolean,
        public demarche: boolean,
        public smart: boolean,
        public action: boolean,
        public realisable: boolean,
        public cumulativeTotal: number,
        public remarques: Remarque[],
        public project:Project,

    ) {}
}