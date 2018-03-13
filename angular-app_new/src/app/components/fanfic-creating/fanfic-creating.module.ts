import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FanficCreatingComponent } from './fanfic-creating.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FanficService} from "../../services/fanfic.service";
import {AuthModule} from "../../auth/auth.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '',
        component: FanficCreatingComponent}
    ]),
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
  ],
  declarations: [FanficCreatingComponent],
  providers: [
    FanficService
  ],
})
export class FanficCreatingModule { }
