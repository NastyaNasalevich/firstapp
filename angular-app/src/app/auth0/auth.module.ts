import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { EmailConfirmComponent } from './email-confirm/email-confirm.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {GrowlModule, InputTextModule} from "primeng/primeng";
import {AuthComponent} from "./auth.component";
import {Http, RequestOptions} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '',
        component: AuthComponent},
    ]),
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    InputTextModule,
    GrowlModule
  ],
  providers: [
    UserService,
    AuthenticationService
  ],
  declarations: [AuthComponent, LoginComponent, RegistrationComponent, EmailConfirmComponent],
  exports: [RouterModule]
})
export class AuthModule {
}
