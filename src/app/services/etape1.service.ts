import { Injectable } from '@angular/core';
import { Etape1 } from '../Models/Etape1/Etape1';
import { Etape1ApiService } from '../api/etape1-api.service';
import { BehaviorSubject } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class Etape1Service {

  constructor(private etape1ApiService:Etape1ApiService) {
  }
  findAll(){
    return this.etape1ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape1ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape1ApiService.delete(id).subscribe((data)=>{;
    });
  }
  update(etape1:Etape1){
    return this.etape1ApiService.update(etape1).subscribe((data)=>{
    });
  }
downloadPDF(id: number, filename: string) {
    this.etape1ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape1ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
