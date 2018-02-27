import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {HomeComponent} from './home-component/home.component';
import {HeaderComponent} from './header-component/header.component';
import {MainRoutingModule} from './main-routing.module';
import {DraftComponent} from './draft-component/draft.component';
import {GrowlModule, InputTextModule} from 'primeng/primeng';
import {PreviewComponent} from './preview-component/preview.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import {CalendarModule} from 'primeng/primeng';
import { Ng2FileDropModule }  from 'ng2-file-drop';
import {DragAndDropComponent} from "./darg-and-drop-component/drag-and-drop.component";
import {EditorModule} from 'primeng/primeng';
import {FanficComponent} from "./fanfic/fanfic.component";
import {ChapterComponent} from "./chapter/chapter.component";
import { TagInputModule } from 'ng2-tag-input';
import {GeneralInfoComponent} from "./draft-component/general-info-component/general-info.component";
import {DescriptionComponent} from "./draft-component/description-component/description.component";
import {ProfileComponent} from "./profile-component/profile.component";
import {ProjectsBlockComponent} from "./projects-block-component/projects-block.component";
import {RatingModule} from "ng2-rating";
import {FanficService} from "../services/fanfic.service";
import {ChapterService} from "../services/chapter.service";
import {DateService} from "../../services/date.service";
import {TagsService} from "../services/tag.service";
import {CommentComponent} from "./comment/comment.component";
import {CommentService} from "../services/comment.service";
import {RatingService} from "../services/rating.service";
import {AdminModule} from "./admin/admin.module";
import {ConfirmationComponent} from "./confirm-component/confirmation.component";
import { MainPageComponent } from './main-page/main-page.component';



@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    CalendarModule,
    Ng2FileDropModule,
    EditorModule,
    TagInputModule,
    RatingModule,
    AdminModule,
    GrowlModule,
  ],
  providers: [
    FanficService,
    ChapterService
    DateService,
    TagsService,
    CommentService,
    RatingService,
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    HeaderComponent,
    DraftComponent,
    PreviewComponent,
    DragAndDropComponent,
    FanficComponent,
    ChapterComponent,
    GeneralInfoComponent,
    DescriptionComponent,
    ProfileComponent,
    ProjectsBlockComponent,
    CommentComponent,
    ConfirmationComponent,
    MainPageComponent
  ],
  exports: [MainComponent]
})
export class MainModule {
}
