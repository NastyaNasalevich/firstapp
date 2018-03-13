import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {GrowlModule} from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    GrowlModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent},
    ]),
    ReactiveFormsModule
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }

