import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {AuthService} from "../../services/auth.service";
import {Message} from "primeng/primeng";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  userForm: FormGroup;
  user: User = new User();
  invalid = false;
  error = false;
  msgs: Message[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'name': [this.user.username, [
        Validators.required
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required
      ]]
    })
  }

  register() {
    if (!this.userForm.valid) {
      this.invalid = true;
      return;
    }
    this.authService.create(this.user).subscribe(
      data => {
        this.router.navigate(['/login'])
      },
      error => {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error',
          detail: 'Пользователь с таким именем уже зарегестрирован'})
      }
    );
  }
}
