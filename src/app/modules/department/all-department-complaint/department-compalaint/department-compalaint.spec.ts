import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComplaint } from './department-compalaint';

describe('DepartmentCompalaint', () => {
  let component: DepartmentComplaint;
  let fixture: ComponentFixture<DepartmentComplaint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentComplaint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentComplaint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
