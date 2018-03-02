import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {UserService} from "./user.service";
import { environment } from 'environments/environment';

@Injectable()
export class RatingService {

  constructor(private http: Http,
              private userService: UserService) {

  }

  checkEnable(chapterId: number) {
    return this.http.get(`${environment.serverUrl}/rating/check/` + chapterId, this.userService.jwt())
      .map((response: Response) => response.json());
  }
}
