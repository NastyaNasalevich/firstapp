import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {URL} from "../constants";
import {UserService} from "./user.service";
import {Comment} from "../model/comment";

@Injectable()
export class CommentService {

  constructor(private http: Http,
              private userService: UserService) {

  }

  saveComment(comment: Comment) {
    return this.http.post(URL + '/comments/create', comment, this.userService.jwt())
      .map((response: Response) => response.json());
  }

  deleteComment(comment: Comment) {
    return this.http.post(URL + '/comments/delete', comment, this.userService.jwt())
      .map((response: Response) => response.json());
  }
}
