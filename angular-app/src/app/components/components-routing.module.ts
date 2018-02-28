import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {ComponentsComponent} from "./components.component";
import {CreateFanficComponent} from "./create-fanfic/create-fanfic.component";
import {FanficComponent} from "./fanfic/fanfic.component";
import {ProfileComponent} from "./profile/profile.component";
import {FanficBlockComponent} from "./fanfic-block/fanfic-block.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminGuard} from "../guards/admin.guard";
import {UserGuard} from "../guards/user.guard";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ComponentsComponent,
        children: [
          {
            path: '',
            component: MainPageComponent
          },
          {
            path: 'draft',
            component: CreateFanficComponent,
            canActivate: [UserGuard]
          },
          {
            path: 'fanfic/:id',
            component: FanficComponent,

          },
          {
            path: 'profile/:id',
            component: ProfileComponent,
            canActivate: [UserGuard]
          },
          {
            path: 'fanfics/:property/:value',
            component: FanficBlockComponent,
            data: {preload: true}
          },
          {
            path: 'fanfics/:property',
            component: FanficBlockComponent,
            data: {preload: true}
          },
          {
            path: 'fanfics',
            component: FanficBlockComponent,
            data: {preload: true}
          },
          {
            path: 'admin',
            component: AdminComponent,
            canActivate: [AdminGuard]
          }



        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ComponentsRoutingModule {}
