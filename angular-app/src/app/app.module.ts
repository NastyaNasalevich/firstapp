import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {routing} from './app.routes';
import { ComponentsComponent } from './components/components.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

//import {LocaleService, TranslationModule, TranslationService} from "angular-l10n";


@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
//    TranslationModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(public locale: LocaleService, public translation: TranslationService) {
  //   this.locale.addConfiguration()
  //     .addLanguages(['en', 'rus'])
  //     .setCookieExpiration(30);
  //   if (localStorage && localStorage.getItem('language')) {
  //     this.locale.setCurrentLanguage(localStorage.getItem('language'));
  //   }
  //
  //
  //   this.translation.addConfiguration()
  //     .addProvider('/src/assets/locale-');
  //   this.translation.init();
  // }
}
