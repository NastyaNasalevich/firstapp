import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

//  @Language() lang;
  user: User;
  content: string;

  constructor(private userService: UserService,
              private authService: AuthenticationService) {
    this.userService.currentUser.subscribe(user => this.user = user)
  }

  logOut() {
    this.authService.logout();
    this.user = this.userService.getCurrentUser();
  }

  isAdmin(): boolean {
    if ( this.user.role === 'ROLE_ADMIN') return true;
    return false;
  }
}
