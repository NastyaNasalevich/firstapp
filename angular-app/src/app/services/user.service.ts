import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User} from "../model/user";
import 'rxjs/add/operator/map';
import {URL} from "../constants";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Fanfic} from "../model/fanfic";


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

  setUser(user: User) {
    this.userSource.next(user)
  }

  saveUser(user: User) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  updateProfile(user: User) {
    this.http.post(URL + '/users/update', user, this.jwt()).subscribe();
  }

  getUserById(id: number) {
    console.log(URL + '/profile/' + id)
    return this.http.get(URL + '/profile/' + id).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post(URL + '/registration', user).map((response: Response) => response.json());
  }


  addFanficToCurrentUser(fanfic: Fanfic) {
    let user = this.getCurrentUser();
    user.fanfics.push(fanfic);
    this.saveUser(user);
  }

  downloadUserFromLocalStorage() {
    this.setUser(this.getCurrentUser());
  }

  removeUser() {
    localStorage.removeItem('currentUser');
  }
}
