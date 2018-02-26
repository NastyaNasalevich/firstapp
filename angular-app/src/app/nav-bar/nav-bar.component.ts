import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../model/user";
import {CurrentUser} from "../model/current-user";
import {AppService} from "../app.service";
import {Locale} from "../language/locale";
import {LanguageService} from "../language.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [AuthService, AppService, LanguageService]
})
export class NavBarComponent implements OnInit{

  searchQuery: string;
  locale: Locale;
  themeDark: boolean = true;

  constructor(private router: Router, public auth: AuthService, private appService: AppService, private lang: LanguageService) { }

  ngOnInit() {
    this.locale = this.lang.getLocale();
  }

  onDarkThemeClick(){
    this.themeDark = true;
  }

  onLightThemeClick(){
    this.themeDark = false;
  }

  getLangShort(){
    return this.lang.getLocaleItem();
  }

  clickOnRussian(){
    console.log('ru');
    this.locale = this.lang.setLocaleRu();
  }

  clickOnEnglish(){
    console.log('en');
    this.locale = this.lang.setLocaleEn();
  }

  searchClick(){
    this.router.navigate(['/search', this.searchQuery]);
    this.searchQuery = '';
  }
}
