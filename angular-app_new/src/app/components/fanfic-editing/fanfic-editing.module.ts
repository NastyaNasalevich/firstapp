import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FanficEditingComponent } from './fanfic-editing.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "primeng/primeng";
import {AuthModule} from "../../auth/auth.module";
import {RlTagInputModule} from "angular2-tag-input/dist";
import {Ng2CloudinaryModule} from "ng2-cloudinary";
// import { Ng2FileDropModule } from 'ng2-file-drop';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '',
        component: FanficEditingComponent}
    ]),
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    // ProjectCardModule,
    // Ng2CloudinaryModule,
    // FileUploadModule,
    // // Ng2FileDropModule,
    // RlTagInputModule,
  ],
  declarations: [FanficEditingComponent]
})
export class FanficEditingModule { }
