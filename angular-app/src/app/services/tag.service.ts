import {Injectable} from "@angular/core";
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from 'environments/environment';
import {Observable} from "rxjs/Observable";

@Injectable()
export class TagsService {

  constructor(private http: Http) {
  }

  verifyTags(tags: any[]) {
    for (let tag of tags) {
      tag.display = tag.value;
    }
  }
}
