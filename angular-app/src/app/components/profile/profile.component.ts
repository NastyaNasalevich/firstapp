import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
//  @Language() lang;
  private id: number;
  private user: User;
  private subscription: Subscription;
  private myProfile = false;



  constructor(private activateRoute: ActivatedRoute,
              private userService: UserService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    let currentUser = this.userService.getCurrentUser();
    console.log(currentUser);
    if (currentUser && currentUser.id === +this.id) {
      this.userService.setUser(currentUser);
      this.userService.currentUser.subscribe(user => {
        this.user = user;
        console.log(user);
        this.user = user
      });
      this.myProfile = true;
    } else {
      this.userService.getUserById(this.id).subscribe(
        data => this.user = data,
        error => console.log(error)
      )
    }
  }

}
