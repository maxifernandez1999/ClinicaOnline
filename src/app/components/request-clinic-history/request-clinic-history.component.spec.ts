import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestClinicHistoryComponent } from './request-clinic-history.component';

describe('RequestClinicHistoryComponent', () => {
  let component: RequestClinicHistoryComponent;
  let fixture: ComponentFixture<RequestClinicHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestClinicHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestClinicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
