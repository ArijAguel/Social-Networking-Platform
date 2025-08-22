import { Component, ElementRef } from '@angular/core';
import {trigger, state, style, animate, transition, query, group}from '@angular/animations';
import {Router} from "@angular/router";
import {getItem} from "../../utils/localStorage";
import { TranslationService } from 'src/app/services/translation.service';
import { SetDirection } from 'src/app/app.module';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('0.7s ease', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  constructor(private router:Router,private translateService:TranslationService) {
    if(  getItem("user") !== null){
      this.router.navigate(['/feed'])
    }
  }
  switchLanguage(lang: string) {
    this.translateService.switchLanguage(lang);
  }
  images: string[] = [
    '../../../assets/images/partners/UGFS.png',
    '../../../assets/images/partners/esprit_logo-bg.png',
    '../../../assets/images/partners/U_Carthage_logo-bg.png',
    '../../../assets/images/partners/WallahWeCan_logo-bg.png',
    '../../../assets/images/partners/U_Jendouba_logo-bg.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYmoT1UV5XvbUN5IRrU4-CkooTo7wiKxe83Q&s',
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

}
