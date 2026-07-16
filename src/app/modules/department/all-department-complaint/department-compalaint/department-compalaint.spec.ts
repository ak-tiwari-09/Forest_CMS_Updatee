import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCompalaint } from './department-compalaint';

describe('DepartmentCompalaint', () => {
  let component: DepartmentCompalaint;
  let fixture: ComponentFixture<DepartmentCompalaint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentCompalaint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentCompalaint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
