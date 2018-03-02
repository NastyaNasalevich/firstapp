import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {AppRoutingModule} from './app.routes';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserService} from "./services/user.service";
import {AuthenticationService} from "./services/authentication.service";
import {AdminGuard} from "./guards/admin.guard";
import {UserGuard} from "./guards/user.guard";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    HttpModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    UserService,
    AuthenticationService,
    AdminGuard,
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
