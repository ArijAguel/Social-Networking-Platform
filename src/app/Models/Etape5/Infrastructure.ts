export class Infrastructure {
    constructor(
        public id: number,
        public element: string,
        public type: string,
        public quantite: number,
        public prix: number,
        public fournisseur: string,
        public nbOfYears:number,
        public depreciationYear1:number,
        public depreciationYear2:number,
        public depreciationYear3:number,
        public depreciationYear4:number,
        public depreciationYear5:number,
    ) {}
}
