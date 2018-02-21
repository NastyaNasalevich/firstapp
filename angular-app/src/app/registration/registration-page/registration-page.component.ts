import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {RegistrationUser} from "../../model/RegistrationUser";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  newUser: RegistrationUser;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    this.newUser = new RegistrationUser();
  }

  registr() {
    this.authService.registr(this.newUser)
      .subscribe(() => {
        this.router.navigate([this.returnUrl]);
      });
  }
}
