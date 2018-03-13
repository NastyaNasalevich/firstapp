import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Fanfic} from "../../model/fanfic";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanficService} from "../../services/fanfic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-fanfic-creating',
  templateUrl: './fanfic-creating.component.html',
  styleUrls: ['./fanfic-creating.component.css']
})
export class FanficCreatingComponent implements OnInit {

  model = new Fanfic();
  submitted = false;
  returnUrl: string;
  formGroup: FormGroup;
  errorMessage: string;
  currentUser;
  // private subscription: Subscription;
  fanficId: number;

  @Input() elementId: String;
  @Input() value: any;

  constructor(
    private fanficService: FanficService,
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.returnUrl = 'fanfic/edit/' + (this.currentUser ? this.currentUser.id + '/' : '');
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      genre: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]]
    });
    // this.subscription = this.activatedRoute.params.subscribe(params =>
    //   this.fanficId = params['fanfic_id']);
    this.fanficService.findFanficById(this.fanficId)
      .subscribe(data => {
        Object.assign(this.model, data);
        if (!this.model.tags) {
          this.model.tags = [];
        }
      });
  }

  onSubmit() {
    if (this.currentUser) {
      this.submitted = true;
      this.errorMessage = null;

      this.fanficService.showMessage();
      this.fanficService.create(this.model.title, this.currentUser.id, this.model.genre, this.model.description)
        .subscribe(
          data => {
            this.returnUrl += data.fanfic_id;
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.submitted = false;
            this.errorMessage = error.json().message;
          }
        );
    }
  }
}
