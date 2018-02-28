import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficBlockComponent } from './fanfic-block.component';

describe('FanficBlockComponent', () => {
  let component: FanficBlockComponent;
  let fixture: ComponentFixture<FanficBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanficBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanficBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
