import { Component, OnInit } from '@angular/core';
import {Fanfic} from "../../model/fanfic";
import {User} from "../../model/user";
import {Subscription} from "rxjs/Subscription";
import {Message} from 'primeng/components/common/api';
import {FanficService} from "../../services/fanfic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-fanfic',
  templateUrl: './create-fanfic.component.html',
  styleUrls: ['./create-fanfic.component.css']
})
export class CreateFanficComponent implements OnInit {

  // @ViewChild('begin') begin: ElementRef;
  private fanfic: Fanfic;
  private invalid = false;
  private editFanfic;
  private currentUser: User;
  private subscription: Subscription;
  private msgs: Message[] = [];

  constructor(private fanficService: FanficService,
              private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.currentUser = user);
    this.subscription = this.activatedRoute
      .queryParams
      .subscribe(params => {
        let edit = params['edit']
        if (edit === 'false') this.editFanfic = false;
        if (edit === 'true') this.editFanfic = true;
      })
    if (this.editFanfic) {
      this.fanfic = this.fanficService.getEditFanfic();
    } else {
      this.fanfic = this.fanficService.getDraft();
    }
  }

  save() {
    if (!this.editFanfic) {
      this.fanficService.saveDraft(this.fanfic);
    } else {
      this.fanficService.updateFanfic(this.fanfic);
    }
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success', detail: 'Saved success'})
  }

  removeDraft() {
    this.fanficService.removeDraft();
  }

  send() {
    if (!this.fanficService.isValid(this.fanfic)) {
      this.invalid = true;
      this.save();
      // this.begin.nativeElement.click();
    } else {
      this.fanficService.create(this.fanfic).subscribe(
        data => {
          this.userService.addFanficToCurrentUser(this.fanfic);
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: 'Success', detail: 'You fanfic success published'})
        },
        error => console.log(error)
      );
    }
  }

}
