import { ComponentFixture, TestBed } from '@angular/core/testing';

// ✅ Use AddComplaintComponent (not AddComplaint)
import { AddComplaintComponent } from './add-complaint';

describe('AddComplaintComponent', () => {
  let component: AddComplaintComponent;
  let fixture: ComponentFixture<AddComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddComplaintComponent]  // ✅ Fix here too
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComplaintComponent);  // ✅ Fix here
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});