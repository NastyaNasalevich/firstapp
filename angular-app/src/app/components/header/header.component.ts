import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

//  @Language() lang;
  user: User;
  content: string;

  language: boolean;
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
