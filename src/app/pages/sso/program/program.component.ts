import { Component } from '@angular/core';
import { getItem } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent {
  user=getItem("user")
  project={
    'image':'',
    'name' :'znfo'
  }
  visible: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  constructor() {
  }
  onSubmitAdd(){

  }
  onSubmitEdit(){

  }
  showDialog(){
    this.visible=true;
  }
  showDialog2(){
    this.visible2=true;
  }
  showDialog3(){
    this.visible3=true;
  }
  makePublic(){

  }
  prospect(){

  }
  delete(){

  }

}
