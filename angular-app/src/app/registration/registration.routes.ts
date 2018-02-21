import {Routes} from "@angular/router";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {RegistrationPageGuard} from "./registration-page.guard";

const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent,
    canActivate: [RegistrationPageGuard]
  }
];

export const registrationRoutes = routes;
