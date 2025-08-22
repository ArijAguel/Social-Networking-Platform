import { Injectable } from '@angular/core';
import { Etape4ApiService } from '../api/etape4-api.service';
import { Etape4 } from '../Models/Etape4/Etape4';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class Etape4Service {

  constructor(private etape4ApiService:Etape4ApiService) { }
  findAll(){
    return this.etape4ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape4ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape4ApiService.delete(id).subscribe((data)=>{;
    });
  }
  update(etape1:Etape4){
    return this.etape4ApiService.update(etape1).subscribe((data)=>{
    });
  }
  downloadPDF(id: number, filename: string) {
    this.etape4ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape4ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
