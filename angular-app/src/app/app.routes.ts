import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth0/auth.component";
import {RegistrationComponent} from "./auth0/registration/registration.component";
import {EmailConfirmComponent} from "./auth0/email-confirm/email-confirm.component";

@NgModule({
  imports: [RouterModule.forRoot([
      {
        path: '',
        loadChildren: './components/components.module#ComponentsModule',
        data: {preload: true}
      },
      {
        path: 'login',
        component: AuthComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'confirm',
        component: EmailConfirmComponent
      }
    ],
    {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
