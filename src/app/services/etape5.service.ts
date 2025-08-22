import { Injectable } from '@angular/core';
import { Etape5ApiService } from '../api/etape5-api.service';
import { Etape5 } from '../Models/Etape5/Etape5';
import * as saveAs from 'file-saver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Etape5Service {

  constructor(private etape5ApiService: Etape5ApiService) {}
  findAll(){
    return this.etape5ApiService.findAll().subscribe((data)=>{
    });
  }
  findByProjectIdAll(id:number){
    return this.etape5ApiService.findByProjectId(id).subscribe((data)=>{
    });
  }
  delete(id:number){
    return this.etape5ApiService.delete(id).subscribe((data)=>{;
    });
  }
  update(etape1: Etape5): Observable<any> {
    return this.etape5ApiService.update(etape1);
  }
  
  downloadPDF(id: number, filename: string) {
    this.etape5ApiService.downloadPDF(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      saveAs(blob, filename);
    });
  }

  downloadWord(id: number, filename: string) {
    this.etape5ApiService.downloadWord(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, filename);
    });
  }
}
