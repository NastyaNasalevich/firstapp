import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './auth/login/login.module'
  },
  {
    path: 'users',
    loadChildren: './users/users.module'
  },
  {
    path: 'registration',
    loadChildren: './auth/registration/registration.module#RegistrationModule'
  },
  {
    path: 'confirm',
    loadChildren: './auth/email-confirm/email-confirm.module#EmailConfirmModule'
  },
  {
    path: 'fanfic/create',
    loadChildren: './components/fanfic-creating/fanfic-creating.module#FanficCreatingModule'
  },
  {
    path: 'fanfic/edit',
    loadChildren: './components/fanfic-editing/fanfic-editing.module#FanficEditingModule'
  },
];

export const routing = RouterModule.forRoot(routes);
