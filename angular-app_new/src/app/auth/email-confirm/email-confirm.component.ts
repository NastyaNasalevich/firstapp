import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {

  RegistrationHash: string;
  error: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.RegistrationHash = params['RegistrationHash'];
        this.confirmUser();
      });
  }

  confirmUser() {
    this.authService.confirmUser(this.RegistrationHash).subscribe();
  }
}
