import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLineManagerComponent } from './employee-line-manager.component';

describe('EmployeeLineManagerComponent', () => {
  let component: EmployeeLineManagerComponent;
  let fixture: ComponentFixture<EmployeeLineManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeLineManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeLineManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
