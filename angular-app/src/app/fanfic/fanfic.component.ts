import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {AppService} from "../app.service";
import {Fanfic} from "../model/fanfic";
import {AuthService} from "../auth/auth.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Page} from "../model/page";
import {PageElement} from "../model/pageElement";
declare var jQuery:any;

@Component({
  selector: 'app-fanfic',
  templateUrl: './fanfic.component.html',
  styleUrls: ['./fanfic.component.css'],
  providers: [AppService]
})
export class FanficComponent implements OnInit {


  imageData:PageElement = {
    id: '',
    x: 0,
    y: 0,
    contentType: 'Image',
    inner: this.sanitizer.bypassSecurityTrustHtml('<div>Click me</div>')
  };

  receivedData:Array<PageElement> = [];
  pages: Page[] = [];
  currentPageId: number;
  selectedRow: number;
  ifHorizontal: boolean = true;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.pages.push({id: 0, content: []});
    this.currentPageId = 0;
    this.selectedRow = 0;
  }

  transferDataSuccess($event) {
    this.deleteExistingElement($event.dragData.id);
    var body = document.getElementById('page-body');
    var rect = body.getBoundingClientRect();
    this.receivedData.push({
      id: 'summernote' + new Date().getTime(),
      x: $event.mouseEvent.clientX - rect.left,
      y: $event.mouseEvent.clientY - rect.top,
      contentType: $event.dragData.contentType,
      inner: $event.dragData.inner
    }) - 1;
  }

  dragDataSuccess($event){
    var el = document.getElementById($event.dragData.id);
    $event.dragData.inner = this.sanitizer.bypassSecurityTrustHtml(el.innerHTML);
  }

  getFunction(data){
    switch (data.contentType){
      case 'Image': return this.editImage(event);
    }
  }

  private deleteExistingElement(id: string){
    var i;
    for (i = 0; i < this.receivedData.length; i++){
      if(this.receivedData[i].id === id){
        break;
      }
    }
    this.receivedData.splice(i, 1);
  }

  private editImage($event){
    var element = $event.currentTarget;
    var x = +element.style.left.slice(0, element.style.left.indexOf('px'));
    var rootTag = document.getElementById('page-body');
    var width = rootTag.clientWidth - x;
    jQuery('#' + element.id).summernote({
      focus: true,
      lang:'ru-RU',
      width: width,
      toolbar: [
        // [groupName, [list of button]]
        ['insert',['picture']],
        ['mybuttons', ['Save']]
      ],
      fontNames:['Arial','Times New Roman','Helvetica'],
      buttons: {
        Save: function () {
          var ui = jQuery.summernote.ui;

          // create button
          var button = ui.button({
            contents: '<i class="fa fa-child"/> Save',
            click: function () {
              // invoke insertText method with 'hello' on editor module.
              jQuery('#' + element.id).summernote('code');
              jQuery('#' + element.id).summernote('destroy');
            }
          });

          return button.render();   // return button as jquery object
        },
      },
      callbacks: {
        onInit: function($event) {
          var x = $event.note[0].style.left;
          var y = $event.note[0].style.top;
          $event.editor[0].style.left = x;
          $event.editor[0].style.top  = y;
          $event.editor[0].style.position  = 'absolute';
        }
      }
    });
  }


  calculateElementWidthInPercents(x: number){
    var rootTag = document.getElementById('page-body');
    return ((rootTag.clientWidth - x)/rootTag.clientWidth)*100 + '%';
  }

  saveContentOfCurrentPage(){
    this.receivedData.forEach(p => {
      var el = document.getElementById(p.id);
      p.inner = this.sanitizer.bypassSecurityTrustHtml(el.innerHTML);
    })
    for (var i = 0; i < this.pages.length; i++){
      if(this.pages[i].id === this.currentPageId){
        this.pages[i].content = this.receivedData;
        break;
      }
    }
  }

  addPage(){
    this.saveContentOfCurrentPage();
    if(this.pages.length < 10){
      var idValue = this.pages.length;
      this.pages.push({id: idValue, content: []});
      this.receivedData = this.pages[idValue].content;
      this.currentPageId = idValue;
      this.selectedRow = idValue;
    }
  }

  onPageClick(i: number, page: Page){
    this.saveContentOfCurrentPage();
    this.currentPageId = page.id;
    this.selectedRow = page.id;
    this.receivedData = this.pages[i].content;
  }

  clickOnH(){
    this.ifHorizontal = true;
  }
  clickOnV(){
    this.ifHorizontal = false;
  }
}
