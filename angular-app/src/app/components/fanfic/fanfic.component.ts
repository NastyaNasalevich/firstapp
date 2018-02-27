import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Fanfic} from "../../model/fanfic";
import {Language} from "angular-l10n";
import {User} from "../../model/user";
import {ChapterService} from "../../services/chapter.service";
import {Chapter} from "../../model/chapter";
import {FanficService} from "../../services/fanfic.service";
import {TagsService} from "../../services/tag.service";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-fanfic',
  templateUrl: './fanfic.component.html',
  styleUrls: ['./fanfic.component.css']
})
export class FanficComponent implements OnInit {

  @Language() lang;
  private id: number;
  private fanfic: Fanfic;
  private myFanfic = false;
  private currentUser: User;

  constructor(private activateRoute: ActivatedRoute,
              private fanficService: FanficService,
              private tagService: TagsService,
              private userService: UserService,
              private router: Router,
              private chapterService: ChapterService) {
  }

  ngOnInit(): void {
    if (this.id === 0) {
      this.fanfic = this.fanficService.verifyFanfic(this.fanfic);
      this.myFanfic = true;
    } else {
      this.fanficService.getFanficById(this.id).subscribe(
        data => {
          console.log(data);
          this.fanfic = data;
          this.tagService.verifyTags(this.fanfic.tags);
          if (this.currentUser && this.currentUser.id === this.fanfic.userId) {
            this.myFanfic = true;
          }
        },
        error => console.log()
      )

    }
    this.currentUser = this.userService.getCurrentUser();
  }

  navigate() {
    this.fanficService.saveAsEditFanfic(this.fanfic);
    this.router.navigate(['/draft'], {queryParams: {edit: true}});
  }

  addChapter(chapter: Chapter) {
    chapter.fanficId = this.fanfic.id;
    console.log(chapter);
    this.chapterService.saveChapter(chapter).subscribe(
      responce => {
        if (!responce) {
          for (let i = this.fanfic.chapters.length; i >= 0; ++i) {
            if (this.fanfic.chapters[i].chapter.content === chapter.content) {
              this.fanfic.chapters.splice(i, 1);
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  isGuest(): boolean {
    if (!this.currentUser) return true;
    return false;
  }
}

