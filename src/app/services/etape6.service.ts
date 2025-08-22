import { Injectable } from '@angular/core';
import { Etape6ApiService } from '../api/etape6-api.service';
import { Etape6 } from '../Models/Etape6/Etape6';
import * as saveAs from 'file-saver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Etape6Service {

  constructor(private etape6ApiService:Etape6ApiService) { }
  findAll(){
    return this.etape6ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape6ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape6ApiService.delete(id).subscribe((data)=>{;
    });
  }
  update(etape1:Etape6): Observable<any> {
    return this.etape6ApiService.update(etape1)
  }
  downloadPDF(id: number, filename: string) {
    this.etape6ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape6ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
