import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import {URL} from "../constants";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http,
              private userService: UserService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(URL + '/login', { username, password })
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          this.userService.getUserById(user.id).subscribe(
            data => {
              user.projects = data.projects;
              user.followedProjects = data.followedProjects;
              this.userService.saveUser(user);
            },
            error => console.log(error)
          )
          this.userService.saveUser(user);
          this.userService.downloadUserFromLocalStorage();
        }
      })
  }

  logout() {
    this.userService.removeUser();
  }
}
