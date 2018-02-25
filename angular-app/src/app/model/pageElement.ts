import {SafeHtml} from "@angular/platform-browser";

export interface PageElement{
  id: string,
  x: number,
  y: number,
  contentType: string,
  inner: SafeHtml
}
