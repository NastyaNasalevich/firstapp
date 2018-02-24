import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {routing} from './app.routes';
import { MainComponent } from './main/main.component';
import { FanficComponent } from './fanfic/fanfic.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FanficComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
