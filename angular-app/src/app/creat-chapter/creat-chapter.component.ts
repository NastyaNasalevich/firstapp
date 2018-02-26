import { Component, OnInit } from '@angular/core';
import {Chapter} from "../model/chapter";
import {AppService} from "../app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-creat-chapter',
  templateUrl: './creat-chapter.component.html',
  styleUrls: ['./creat-chapter.component.css']
})
export class CreatChapterComponent implements OnInit {

  newChapter: Chapter = {
    id: 0,
    title: '',
    fanfic: [],
    comments: [],
    ratings: [],
    content: ''
  };
  haveName = true;

  constructor(private appService: AppService, private router: Router) { }

  @ViewChild(BuilderComponent) builder: BuilderComponent

  ngOnInit() {
  }

  createNewChapterClick(){
    if(this.newChapter.title === ''){
      this.haveName = false;
      return;
    }
    this.newChapter.content = JSON.stringify({
      body: this.builder.getPages(),
      navbar: this.builder.ifHorizontal
    });
    this.appService.addChapter(this.newChapter).subscribe(res => {
      this.router.navigate(['/chapter', +res]);
    });
  }
}
