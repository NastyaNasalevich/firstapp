import { Component, OnInit } from '@angular/core';
import {Chapter} from "../../model/chapter";
import {Comment} from "../../model/comment";
import {Router, ActivatedRoute} from "@angular/router";
import {User} from "../../model/user";
import {Rating} from "../../model/rating";
import {Language} from "angular-l10n";
import {ChapterService} from "../../services/chapter.service";
import {FanficService} from "../../services/fanfic.service";
import {UserService} from "../../services/user.service";
import {RatingService} from "../../services/rating.service";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css'],
})
export class ChapterComponent implements OnInit {

  @Language() lang;
  private id: number;
  private myChapter = false;
  private currentUser: User;
  chapter: Chapter;

  constructor(private activateRoute: ActivatedRoute,
              private chapterService: ChapterService,
              private fanficService: FanficService,
              private userService: UserService,
              private router: Router,
              private ratingService: RatingService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    if (this.id === 0) {
      this.chapter = this.chapterService.verifyChapter(this.chapter);
      this.myChapter = true;
    } else {
      this.chapterService.getChapterById(this.id).subscribe(
        data => {
          console.log(data);
          this.chapter = data;
          this.ratingService.checkEnable(this.id).subscribe(
            response => {
              this.chapter.isRated = !response;
              console.log(response);
            },
            error => {
              console.log(error);
              this.chapter.isRated = true;
            }
          )
          if (this.currentUser && this.currentUser.id === this.chapter.userId) {
            this.myChapter = true;
            this.chapter.isRated = true;
          }
        },
        error => console.log()
      )

    }
    this.currentUser = this.userService.getCurrentUser();
  }
  navigate() {
    this.chapterService.saveAsEditChapter(this.chapter);
    this.router.navigate(['/draft'], {queryParams: {edit: true}});
  }

  addComment(comment: Comment) {
    comment.chapterId = this.chapter.id;
    console.log(comment);
    this.commentService.saveComment(comment).subscribe(
      responce => {
        if (!responce) {
          for (let i = this.chapter.comments.length; i >= 0; ++i) {
            if (this.chapter.comments[i].comment.content === comment.content) {
              this.chapter.comments.splice(i, 1);
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

  addRating() {
    if (!this.chapter.isRated) {
      console.log(this.chapter.rating);
      let rating = new Rating();
      rating.amount = this.chapter.rating;
      rating.userId = this.currentUser.id;
      rating.chapterId = this.chapter.id;
      this.chapterService.rate(rating).subscribe(response => {
          this.chapter.rating = response.totalRating;
          this.chapter.isRated = true;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    }
  }
}
