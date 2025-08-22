import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { InvestementApiService } from '../api/investement-api.service';

@Injectable({
  providedIn: 'root'
})
export class InvestementService {

  constructor(private toaster: ToastrService,private investementApiService:InvestementApiService) { }

  getAllPortfolio(){
    return this.investementApiService.getAllPortfolio();
  }

  addInvestment(investment: any){
    return this.investementApiService.addInvestment(investment);
  }

  deleteInvestment(id: number){
    return this.investementApiService.deleteInvestment(id);
  }

  updateInvestment(investment: any){
    return this.investementApiService.updateInvestment(investment);
  }

  getAllApplications(){
    return this.investementApiService.getAllApplications();
  }

  apply(investmentApplication: any){
    return this.investementApiService.apply(investmentApplication);
  }

  updateApplication(investmentApplication: any){
    return this.investementApiService.updateApplication(investmentApplication);
  }

  deleteApplication(id: number){
    return this.investementApiService.deleteApplication(id);
  }

  getAllProgramJoinApplications(){
    return this.investementApiService.getAllProgramJoinApplications();
  }

  inviteProgramJoinApplication(programJoinApplication: any){
    return this.investementApiService.inviteProgramJoinApplication(programJoinApplication);
  }

  updateProgramJoinApplication(programJoinApplication: any){
    return this.investementApiService.updateProgramJoinApplication(programJoinApplication);
  }

  deleteProgramJoinApplication(id: number){
    return this.investementApiService.deleteProgramJoinApplication(id);
  }

  




  
}
