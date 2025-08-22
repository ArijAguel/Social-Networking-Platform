import { FLOAT } from "html2canvas/dist/types/css/property-descriptors/float";

export class Fonds {
    constructor(
        public id: number,
        public element: string,
        public type: string,
        public quantite: number,
        public prix: number,
        public workingCapital:Boolean,        
        public periodicity:string,
        public augYear2: number,
        public augYear3: number,
        public augYear4: number,
        public augYear5: number,
    ) {}
}
