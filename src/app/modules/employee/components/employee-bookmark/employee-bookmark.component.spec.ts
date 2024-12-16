import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBookmarkComponent } from './employee-bookmark.component';

describe('EmployeeBookmarkComponent', () => {
  let component: EmployeeBookmarkComponent;
  let fixture: ComponentFixture<EmployeeBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBookmarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
