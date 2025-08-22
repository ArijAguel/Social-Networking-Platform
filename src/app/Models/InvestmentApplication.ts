export class InvestmentApplication{
    id: number = 0;
    idProject: number = 0;
    idInvestisseur: number = 0;
    creationDate:Date = new Date();
    equity: number = 0;
    theAsk: number = 0;
    shareable: boolean = false;
    noteEntrepeneur: string = '';
    noteInvestisseur: string = '';
    action: string = '';
}
