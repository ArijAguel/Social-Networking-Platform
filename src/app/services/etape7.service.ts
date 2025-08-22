import { Injectable } from '@angular/core';
import { Etape7ApiService } from '../api/etape7-api.service';
import { Etape7 } from '../Models/Etape7/Etape7';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class Etape7Service {

  constructor(private etape7ApiService:Etape7ApiService) { }
  findAll(){
    return this.etape7ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape7ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape7ApiService.delete(id).subscribe((data)=>{;
    });
  }
  update(etape1:Etape7){
    return this.etape7ApiService.update(etape1).subscribe((data)=>{
    });
  }
  downloadPDF(id: number, filename: string) {
    this.etape7ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape7ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
