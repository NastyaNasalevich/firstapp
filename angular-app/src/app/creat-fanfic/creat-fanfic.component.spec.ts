import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatFanficComponent } from './creat-fanfic.component';

describe('CreatFanficComponent', () => {
  let component: CreatFanficComponent;
  let fixture: ComponentFixture<CreatFanficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatFanficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatFanficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
