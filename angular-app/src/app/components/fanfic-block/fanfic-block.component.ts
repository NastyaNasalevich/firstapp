import { Component, OnInit } from '@angular/core';
import {Fanfic} from "../../model/fanfic";
import {Subscription} from "rxjs/Subscription";
import {FanficService} from "../../services/fanfic.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-fanfic-block',
  templateUrl: './fanfic-block.component.html',
  styleUrls: ['./fanfic-block.component.css']
})
export class FanficBlockComponent implements OnInit {

  fanfics: Fanfic[] = [];
  private isLastPage = false;
  private subscription: Subscription;
  private property: string;
  private type: string;
  private value: string;


  constructor(private fanficService: FanficService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
    this.subscription = this.activateRoute.params.subscribe(params => {
      this.property = params['property'];
      this.type = params['type'];
      this.value = params['value'];
      if (this.property === null) {
        this.property = 'all';
      }
      if (this.type) {
        this.type = '/' + this.type;
      } else {
        this.type = ""
      }
      if (this.value) {
        this.value = '/' + this.value;
      } else {
        this.value = ""
      }
    })
  }

  ngOnInit() {
    this.fanficService.getFanficNextPage(this.property, this.type, this.value).subscribe(
      data => {
        console.log(data);
        if (data.last && data.last === true) {
          this.isLastPage = true;
        }
        if (data.page) {
          this.fanfics = this.fanfics.concat(data.page);
        }
        if (this.property === 'search') {
          this.fanfics = this.fanfics.concat(data);
        }
      }
    )
  }
}
