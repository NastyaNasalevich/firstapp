import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {URL} from "../constants";
import {UserService} from "./user.service";
import {Chapter} from "../model/chapter";
import {Rating} from "../model/rating";

@Injectable()
export class ChapterService {

  constructor(private http: Http,
              private userService: UserService) {

  }

  saveChapter(chapter: Chapter) {
    return this.http.post(URL + '/chapters/create', chapter, this.userService.jwt())
      .map((response: Response) => response.json());
  }

  deleteChapter(chapter: Chapter) {
    return this.http.post(URL + '/chapters/delete', chapter, this.userService.jwt())
      .map((response: Response) => response.json());
  }

  verifyChapter(сhapter: Chapter): Chapter {
    if (!сhapter.title) сhapter.title = "Название главы";
    if (!сhapter.content) сhapter.content = "Текст главы";

    return сhapter;
  }

  getChapterById(id: number) {
    return this.http.get(URL + '/chapters/' + id).map((responce: Response) => responce.json() as Chapter);
  }

  saveAsEditChapter(chapter: Chapter) {
    console.log("Save as editChapter");
    console.log(chapter);
    localStorage.setItem('editProject', JSON.stringify(chapter));
  }

  rate(rating: Rating) {
    return this.http.post(URL + "/rating/rate", rating, this.userService.jwt())
      .map(responce => responce.json());
  }
}
