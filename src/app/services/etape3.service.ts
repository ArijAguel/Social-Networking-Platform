import { Injectable } from '@angular/core';
import { Etape1ApiService } from '../api/etape1-api.service';
import { Etape3ApiService } from '../api/etape3-api.service';
import { Etape3 } from '../Models/Etape3/Etape3';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class Etape3Service {

  constructor(private etape3ApiService:Etape3ApiService) { }
  findAll(){
    return this.etape3ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape3ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape3ApiService.delete(id).subscribe((data)=>{;
    });
  }
  update(etape1:Etape3){
    return this.etape3ApiService.update(etape1).subscribe((data)=>{
    });
  }
  downloadPDF(id: number, filename: string) {
    this.etape3ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape3ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
