import { Component, OnInit } from '@angular/core';
import {Fanfic} from "../../model/fanfic";
import {Subscription} from "rxjs/Subscription";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FanficService} from "../../services/fanfic.service";
import {CloudinaryOptions, CloudinaryUploader} from "ng2-cloudinary";
import { Ng2FileDropAcceptedFile } from 'ng2-file-drop';

@Component({
  selector: 'app-fanfic-editing',
  templateUrl: './fanfic-editing.component.html',
  styleUrls: ['./fanfic-editing.component.css']
})
export class FanficEditingComponent implements OnInit {

  supportedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];
  imageShown = false;
  currentProfileImage;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'fanfic-starter', uploadPreset: 'clbhkmd8' })
  );
  imageLoaded = true;

  fanfic = new Fanfic();
  fanficId: number;
  private subscription: Subscription;
  errorMessage: string;
  successMessage: string;
  formGroup: FormGroup;
  submitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fanficService: FanficService,
    private router: Router,
    private fb: FormBuilder )
    {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.fanfic.imageUrl = 'https://res.cloudinary.com/project-starter/image/upload/v1505240342/' +
        res.public_id;
      this.imageLoaded = true;
      return { item, response, status, headers };
    };
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(params =>
      this.fanficId = params['fanfic_id']);

    this.fanficService.findFanficById(this.fanficId)
      .subscribe(data => {
        Object.assign(this.fanfic, data);
        if (!this.fanfic.tags) {
          this.fanfic.tags = [];
        }
      });

    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      // amountMin: ['', [Validators.required, AmountValidators.isValidAmount]],
    });
  }

  // onSubmit() {
  //   this.submitted = true;
  //   this.errorMessage = null;
  //   this.successMessage = null;
  //
  //   this.fanficService.updateFanfic(this.fanfic)
  //     .subscribe(
  //       data => {
  //         Object.assign(this.fanfic, data);
  //         this.successMessage = 'Changes were saved.';
  //         this.submitted = false;
  //       },
  //       error => {
  //         this.errorMessage = error.json().message;
  //         this.submitted = false;
  //       }
  //     );
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  viewFanficPage() {
    this.router.navigate(['/fanfic-info/' + this.fanficId]);
  }

  onTextEditorKeyUp(textValue) {
    this.fanfic.description = textValue;
  }

  //File being dragged has been dropped and is valid
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
    this.imageLoaded = false;
    const fileReader = new FileReader();
    fileReader.onload = () => {

      // Set and show the image
      this.currentProfileImage = fileReader.result;
      this.imageShown = true;
    };

    // Read in the file
    fileReader.readAsDataURL(acceptedFile.file);

    this.uploader.uploadAll();
  }
}
