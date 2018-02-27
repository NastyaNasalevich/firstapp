import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User} from "../model/user";
import 'rxjs/add/operator/map';
import {URL} from "../constants";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable()
export class UserService {

  private userSource = new BehaviorSubject<User>(this.getCurrentUser());
  currentUser = this.userSource.asObservable();

  constructor(private http: Http) {
  }

  getCurrentUser(): User {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('currentUser'))
    }
  }

  public jwt() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'authentication': currentUser.token});
      headers.append("Content-Type", "application/json");
      return new RequestOptions({headers: headers});
    }
  }
}
