import {Injectable} from '@angular/core';
import {Fanfic} from "../model/fanfic";
import {Headers, Http, Response} from "@angular/http";
import { environment } from 'environments/environment';
import {UserService} from "./user.service";
import {User} from "../model/user";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";
import {Router} from "@angular/router";


@Injectable()
export class FanficService {

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {
  }

  showMessage() {
  }

  create(title: string, userId: number, genre: string, description: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token'));

    return this.http
      .post(
        `${environment.serverUrl}fanfic/create`,
        JSON.stringify({title, userId, genre, description}),
        {headers}
      )
      .map(res => {
        return res.json();
      });
  }

  findFanficById(fanficId: number) {
    return this.http.get(`${environment.serverUrl}fanfic/info?fanfic_id=` + fanficId).map(res => res.json());
  }

  updateFanfic(fanfic: Fanfic) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem('token'));

    return this.http
      .post(
        `${environment.serverUrl}fanfic/update`,
        JSON.stringify(fanfic),
        {headers}
      )
      .map(res => {
        return res.json();
      });
  }

}
