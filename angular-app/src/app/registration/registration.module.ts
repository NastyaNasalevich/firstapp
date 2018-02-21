import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {registrationRoutes} from "./registration.routes";
import {RegistrationPageGuard} from "./registration-page.guard";

@NgModule({
  imports: [
    RouterModule.forChild(registrationRoutes),
    CommonModule,
    FormsModule
  ],
  providers: [
    RegistrationPageGuard
  ],
  declarations: [
    RegistrationPageComponent
  ]
})
export default class RegistrationModule {
}
