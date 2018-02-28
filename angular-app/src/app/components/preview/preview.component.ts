import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";
import {Fanfic} from "../../model/fanfic";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent {
//  @Language() lang;
  @Input() fanfic: Fanfic;

  constructor(private router: Router) {

  }

}
