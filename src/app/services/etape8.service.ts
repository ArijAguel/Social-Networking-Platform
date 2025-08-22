import { Injectable } from '@angular/core';
import { Etape8ApiService } from '../api/etape8-api.service';
import * as saveAs from 'file-saver';
import { Etape8 } from '../Models/Etape8/Etape8';

@Injectable({
  providedIn: 'root'
})
export class Etape8Service {

  constructor(private etape8ApiService:Etape8ApiService) { }
  findAll(){
    return this.etape8ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape8ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape8ApiService.delete(id).subscribe((data)=>{;
    });
  }
  update(etape1:Etape8){
    return this.etape8ApiService.update(etape1).subscribe((data)=>{
    });
  }
  downloadPDF(id: number, filename: string) {
    this.etape8ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape8ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
