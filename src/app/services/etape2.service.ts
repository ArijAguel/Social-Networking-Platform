import { Injectable } from '@angular/core';
import { Etape2ApiService } from '../api/etape2-api.service';
import { Etape2 } from '../Models/Etape2/Etape2';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class Etape2Service {

  constructor(private etape2ApiService:Etape2ApiService) { }
  findAll(){
    return this.etape2ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape2ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape2ApiService.delete(id).subscribe((data)=>{;
    });
  }
   update(etape1:Etape2){
    return this.etape2ApiService.update(etape1).subscribe((data)=>{
    });
  }
  downloadPDF(id: number, filename: string) {
    this.etape2ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape2ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
