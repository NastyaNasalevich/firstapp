import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFanficComponent } from './create-fanfic.component';

describe('CreateFanficComponent', () => {
  let component: CreateFanficComponent;
  let fixture: ComponentFixture<CreateFanficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFanficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFanficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
