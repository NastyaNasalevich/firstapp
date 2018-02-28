import {Injectable} from "@angular/core";
import {User} from "../model/user";
import {Http} from "@angular/http";
import {URL} from "../constants";
import {UserService} from "./user.service";

@Injectable()
export class AdminService {

  constructor(private http: Http,
              private userService: UserService) {

  }

  getUsers() {
    return this.http.get(URL + '/admin', this.userService.jwt())
      .map(response => response.json());
  }

  deleteUsers(users: User[]) {
    return this.http.post(URL + '/admin/delete', users, this.userService.jwt())
      .map(response => response.json());
  }

  blockUsers(users: User[]) {
    console.log(users);
    return this.http.post(URL + '/admin/block', users, this.userService.jwt())
      .map(response => response.json());
  }

  unblockUsers(users: User[]) {
    console.log(users);
    return this.http.post(URL + '/admin/unblock', users, this.userService.jwt())
      .map(response => response.json());
  }
}
