import {Injectable} from '@angular/core';
import {Fanfic} from "../model/fanfic";
import {Http, Response} from "@angular/http";
import {URL} from "../constants";
import {UserService} from "./user.service";
import {User} from "../model/user";
import 'rxjs/add/operator/map';


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
}
