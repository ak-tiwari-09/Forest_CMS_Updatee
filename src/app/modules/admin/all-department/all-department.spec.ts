import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDepartment } from './all-department';

describe('AllDepartment', () => {
  let component: AllDepartment;
  let fixture: ComponentFixture<AllDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
