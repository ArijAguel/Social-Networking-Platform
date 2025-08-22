import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'Digital_Incubator_Front_Angular';
  constructor(private translate: TranslateService,private translationService:TranslationService) {
    this.translate.setDefaultLang('en');
    const language = translationService.getLanguage();
    if (language !== null) {
      this.translate.use(language);
    }else{
      this.translate.use('en');
    }
  }
}
