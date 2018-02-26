import {Router} from "@angular/router";
import {Http, RequestOptions, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "./model/user";
import {Fanfic} from "./model/fanfic";
import {Chapter} from "./model/chapter";
import {Comment} from "./model/comment";

@Injectable()
export class AppService {

  token: string;
  private backEndServer = `http://localhost:8080/`;

  constructor(private http: Http, private router: Router) {}

  public getChapterById(id: number){
    return this.makeGetRequest('/chapter?id=' + id).map(res => <Chapter> res.json()).catch(this.handleError);
  }

  private makeGetRequest(path: string){
    return this.http.get(this.backEndServer + path, this.getRequestOptions());
  }

  public deleteCommentById(id: number){
    return this.makeGetRequest('/fanfic/chapter/comment/delete?id=' + id).map(res => res.json()).catch(this.handleError);
  }


  public addComment(comment: Comment){
    let body = JSON.stringify(comment);
    return this.makeChapterRequest('/fanfic/chapter/addComment', body).map(res => <number> res.json()).catch(this.handleError);
  }

  private makeChapterRequest(path: string, body: string){
    return this.http.post(this.backEndServer + path, body, this.getRequestOptions());
  }

  public rateChapter(rating: any){
    let body = JSON.stringify(rating);
    return this.makeChapterRequest('/rating', body).map(res => res.json()).catch(this.handleError);
  }

  public addChapter(chapter: Chapter){
    let body = JSON.stringify(chapter);
    return this.makeChapterRequest('/createChapter', body).map(res => <number> res.json()).catch(this.handleError);
  }

  private getRequestOptions() {
    let headers = new Headers({
      'X-Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    });
    return new RequestOptions({headers: headers})
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
