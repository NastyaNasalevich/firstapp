import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanficEditingComponent } from './fanfic-editing.component';

describe('FanficEditingComponent', () => {
  let component: FanficEditingComponent;
  let fixture: ComponentFixture<FanficEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanficEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanficEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
