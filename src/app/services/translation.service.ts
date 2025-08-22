import { Direction } from '@angular/cdk/bidi';
import { EventEmitter, Injectable, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly storageKey = 'selectedLanguage';
  public languageChanged = new EventEmitter<string>(); // Emit language changes

  constructor(private translate: TranslateService, private router: Router) {
    this.translate.use(this.getLanguage() || 'en'); 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const lang = this.router.url.split('/')[1];
      if (lang && ['en', 'fr', 'ar'].includes(lang)) { 
        this.switchLanguage(lang);
      }
    });
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.setLanguage(lang);
    this.languageChanged.emit(lang); // Notify about the language change
  }

  setLanguage(language: string): void {
    localStorage.setItem(this.storageKey, language);
  }

  getLanguage(): string | null {
    return localStorage.getItem(this.storageKey);
  }
  getDirection(): Direction {
    return this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}
