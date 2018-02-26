import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {routing} from './app.routes';
import { FanficComponent } from './fanfic/fanfic.component';
import { ChapterComponent } from './chapter/chapter.component';
import { CreatChapterComponent } from './creat-chapter/creat-chapter.component';
import { CreatFanficComponent } from './creat-fanfic/creat-fanfic.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FanficComponent,
    ChapterComponent,
    CreatChapterComponent,
    CreatFanficComponent,
    NavBarComponent,
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
