import { Component, OnInit } from '@angular/core';
import {Chapter} from "../model/chapter";
import {Comment} from "../model/comment";
import {Router, ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AppService} from "../app.service";
import {AuthService} from "../auth/auth.service";
import {User} from "../model/user";
import {Rating} from "../model/rating";
import {Page} from "../model/page";
import {PageElement} from "../model/pageElement";
import {Fanfic} from "../model/fanfic";

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css'],
  providers: [AppService]
})
export class ChapterComponent implements OnInit {

  id: number;
  avgRating: number = 0;
  chapter: Chapter = {
    id: 0,
    title: '',
    fanfic: [],
    comments: [],
    ratings: [],
    content: ''
  };

  commentToAdd: Comment = {
    id: 0,
    value: '',
    user: {
      id: 0,
      username: '',
      email: '',
      role: ''
    },
    chapter: this.chapter,
    date: null
  };
  chapterContent: any;
  userRate: Rating;
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
      this.appService.getChapterById(this.id).subscribe(res => {
        this.chapter = res;
        this.computeAvgRating();
        this.chapterContent = JSON.parse(this.chapter.content);
        this.ifHorizontal = this.chapterContent.navbar;
        this.pages = this.chapterContent.body;
        this.receivedData = this.pages[0].content;
        this.userRate = this.checkRate();
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

  clickOnFanfic(fanfic: Fanfic){
    this.router.navigate(['/fanfic', fanfic.id]);
  }

  removeCommentClick(comment: Comment){
    this.appService.deleteCommentById(comment.id).subscribe(res => {
      this.updateChapter();
    });
  }

  leaveCommentClick(){
    this.commentToAdd.chapter = this.chapter;
    this.appService.addComment(this.commentToAdd).subscribe(res => {
      this.updateChapter();
      this.setEmptyCommentModel()
    });
  }

  updateChapter(){
    this.appService.getChapterById(this.id).subscribe(res => {
      this.chapter = res;
      this.computeAvgRating();
      this.userRate = this.checkRate();
    });
  }

  rateChapter(numb: number){
    this.appService.rateChapter({id: 0,
      user: null,
      chapter: this.chapter,
      value: numb}).subscribe(res => {
      this.updateChapter();
    });
  }

  setEmptyCommentModel(){
    this.commentToAdd = {
      id: 0,
      value: '',
      user: {
        id: 0,
        username: '',
        email: '',
        role: ''
      },
      chapter: this.chapter,
      date: null
    };
  }

  editValidation(user: User){
    if(user.id == this.auth.getUser().id || this.auth.getUser().role == 'ROLE_ADMIN'){
      return true;
    }
    return false;
  }

  computeAvgRating(){
    var result: number = 0;
    for (var i = 0; i < this.chapter.ratings.length; i++){
      result += this.chapter.ratings[i].value;
    }
    if(result == 0){
      this.avgRating = 0;
    }
    else {
      this.avgRating = result/this.chapter.ratings.length;
    }
  }

  calculateElementWidthInPercents(x: number){
    var rootTag = document.getElementById('page-body');
    return ((rootTag.clientWidth - x)/rootTag.clientWidth)*100 + '%';
  }

  checkRate(){
    for (var i = 0; i < this.chapter.ratings.length; i++){
      if(this.chapter.ratings[i].user.id == this.auth.getUser().id){
        return this.chapter.ratings[i];
      }
    }
    return null;
  }
}
