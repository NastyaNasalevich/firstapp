import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AppService} from "../app.service";
import {Fanfic} from "../model/fanfic";
import {User} from "../model/user";
import {AuthService} from "../auth/auth.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-fanfic',
  templateUrl: './fanfic.component.html',
  styleUrls: ['./fanfic.component.css'],
  providers: [AppService]
})
export class FanficComponent implements OnInit {

  id: number;
  fanfic: Fanfic = {
    id: 0,
    title: '',
    user: {
      id: 0,
      username: '',
      email: '',
      role: ''
    },
    date: null,
    description: '',
    genre: '',
    image: '',
    tags: [],
    chapters: []
  };

  ifHorizontal: boolean;
  pages: Page[] = [];
  receivedData:Array<PageElement> = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private appService: AppService,
              private auth: AuthService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.appService.getPostById(this.id).subscribe(res => {
        this.post = res;
        this.computeAvgRating();
        this.postContent = JSON.parse(this.post.content);
        this.ifHorizontal = this.postContent.navbar;
        this.pages = this.postContent.body;
        this.receivedData = this.pages[0].content;
      });
    })
  }

  onPageClick(i: number){
    this.receivedData = this.pages[i].content;
  }

  getSanitizer(value: SafeHtml):SafeHtml{
    var jsonValue = JSON.parse(JSON.stringify(value));
    return this.sanitizer.bypassSecurityTrustHtml(jsonValue.changingThisBreaksApplicationSecurity);
  }

  clickOnName(user: User){
    this.router.navigate(['/user', user.id]);
  }

  calculateElementWidthInPercents(x: number){
    var rootTag = document.getElementById('page-body');
    return ((rootTag.clientWidth - x)/rootTag.clientWidth)*100 + '%';
  }
}
