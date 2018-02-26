import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatChapterComponent } from './creat-chapter.component';

describe('CreatChapterComponent', () => {
  let component: CreatChapterComponent;
  let fixture: ComponentFixture<CreatChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
