import {Injectable} from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import { environment } from '../../environments/environment';
import {AuthConfigConsts, AuthHttp} from "angular2-jwt";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Injectable()
export class AuthService {

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {
  }

  login(username: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        `${environment.serverUrl}auth/login`,
        JSON.stringify({username, password}),
        {headers}
      )
      .map(res => {
        return res.json();
      })
      .do(token => {
        localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, token.token);
      });
  }

  logout() {
    localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  getMe() {
    return this.authHttp.get(`${environment.serverUrl}auth/me`).map(res => res.json());
  }
  create(user: User) {
    return this.http.post(`${environment.serverUrl}/registration`, user).map((response: Response) => response.json());
  }

  confirmUser(RegistrationHash: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(`${environment.serverUrl}registration/confirm`,
        JSON.stringify(RegistrationHash), {headers}
      );
  }

}
