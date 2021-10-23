import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestShiftsComponent } from './request-shifts.component';

describe('RequestShiftsComponent', () => {
  let component: RequestShiftsComponent;
  let fixture: ComponentFixture<RequestShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestShiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
