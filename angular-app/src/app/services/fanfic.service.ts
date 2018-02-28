import {Injectable} from '@angular/core';
import {Fanfic} from "../model/fanfic";
import {Http, Response} from "@angular/http";
import {URL} from "../constants";
import {UserService} from "./user.service";
import {User} from "../model/user";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";


@Injectable()
export class FanficService {

  constructor(private http: Http,
              private userService: UserService) {
  }

  verifyFanfic(fanfic: Fanfic): Fanfic {
    if (!fanfic.title) fanfic.title = "Название фанфика";
    if (!fanfic.description) fanfic.description = "Краткое описание фанфика";

    return fanfic;
  }

  getFanficById(id: number) {
    return this.http.get(URL + '/fanfics/' + id).map((responce: Response) => responce.json() as Fanfic);
  }

  saveAsEditFanfic(fanfic: Fanfic) {
    console.log("Save as editFanfic");
    console.log(fanfic);
    localStorage.setItem('editFanfic', JSON.stringify(fanfic));
  }

  getEditFanfic() {
    let fanfic = JSON.parse(localStorage.getItem('editFanfic'));
    return fanfic;
  }

  getDraft() {
    let fanfic = JSON.parse(localStorage.getItem('draft'));
    return fanfic ? fanfic : new Fanfic();
  }
  saveDraft(fanfic: Fanfic) {
    localStorage.setItem('draft', JSON.stringify(fanfic));
  }

  updateFanfic(fanfic: Fanfic) {
    this.http.post(URL + '/fanfics/update', fanfic, this.userService.jwt()).subscribe();
  }

  removeDraft() {
    if (localStorage.getItem('draft')) {
      localStorage.removeItem('draft');
      localStorage.removeItem('completionDate');
    }
  }

  isValid(fanfic: Fanfic) {
    if (typeof fanfic.title === "undefined" ||
      fanfic.title === "" ||
      typeof fanfic.description === "undefined" ||
      fanfic.description === "" ||
      fanfic.tags.length === 0) {
      return false;
    }
    return true;
  }


  create(fanfic: Fanfic): Observable<any> {
    console.log(fanfic);
    let currentUser: User = this.userService.getCurrentUser();
    if (currentUser && (currentUser.role === "ROLE_USER" || currentUser.role === "ROLE_ADMIN") ) {
      fanfic.userId = currentUser.id;
      return this.http.post(URL + '/fanfics/create', JSON.stringify(fanfic), this.userService.jwt())
        .map((response: Response) => response.json());
    }
  }

  getFanficNextPage(property: string, type: string, value: string) {
    console.log(URL + '/fanfics/' + property + type + value);
    return this.http.get(URL + '/fanfics/' + property + type + value)
      .map((response: Response) => response.json());
  }
}
