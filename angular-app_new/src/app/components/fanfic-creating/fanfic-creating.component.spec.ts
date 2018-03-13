import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficCreatingComponent } from './fanfic-creating.component';

describe('FanficCreatingComponent', () => {
  let component: FanficCreatingComponent;
  let fixture: ComponentFixture<FanficCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanficCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanficCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
