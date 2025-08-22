import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isMobileMenu = false;
  isDropdownOpen = false;
  selectedLanguage;
  constructor(private translateService:TranslationService,private router:Router) {
    this.selectedLanguage = this.translateService.getLanguage();
    const storedLanguage = this.translateService.getLanguage();
    if (!storedLanguage) {
      this.selectedLanguage='en';
      this.translateService.switchLanguage('en');
    }
  }
  ngOnInit(): void {
    this.selectedLanguage=this.translateService.getLanguage()
  }

  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  changeLanguage(language: string) {
    this.selectedLanguage = language;
    switch (language) {
      case 'English':
        this.selectedLanguage='en';
        this.translateService.switchLanguage('en');
        break;
      case 'العربية':
        this.selectedLanguage='ar';
        this.translateService.switchLanguage('ar');
        break;
      case 'Français':
        this.selectedLanguage='fr';
        this.translateService.switchLanguage('fr');
        break;    
    }
  }


}
