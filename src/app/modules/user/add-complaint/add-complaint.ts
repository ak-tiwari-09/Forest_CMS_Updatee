import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { Footer } from "../../../footer/footer";
import {
  AbstractControl,        // ✅ Added
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,       // ✅ Added
  ValidatorFn,            // ✅ Added
  Validators
} from '@angular/forms';
import { Navbar } from "../../../navbar/navbar";
import { UserService } from '../../../../shared/user.service';
import { environment } from '../../../../environments/environments';
import { environmentprod } from '../../../../environments/environments.prod';

@Component({
  selector: 'app-add-complaint',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    Footer,
    ReactiveFormsModule,
    Navbar
  ],
  providers: [UserService],
  templateUrl: './add-complaint.html',
  styleUrls: ['./add-complaint.css']
})
export class AddComplaintComponent implements OnInit {

  private userService = inject(UserService);
  private fb          = inject(FormBuilder);

  complaintForm!: FormGroup;
  data: any;

  CategoryList:    any[] = [];
  SubCategoryList: any[] = [];
  StatesList:      any[] = [];
  CitiesList:      any[] = [];

  identityFile:      File | null = null;
  identityFileName:  string = '';
  identityBase64:    string | null = null;
  identityFileError: string = '';

  supportFile:     File | null = null;
  supportFileName: string = '';
  supportBase64:   string | null = null;

  showPassword:        boolean = false;   // ✅
  showConfirmPassword: boolean = false;   // ✅

  constructor() { }

  // ✅ STEP 1: Validator is INSIDE the class as an arrow function
  private passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password        = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;  // ✅ skip if empty (required handles it)

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  ngOnInit(): void {
    // ✅ STEP 2: Validator passed as group-level option
    this.complaintForm = this.fb.group({
      fullName:     ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(100)]],
      guardianName: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(100)]],
      dob:          ['', Validators.required],
      gender:       ['', Validators.required],
      mobile:       ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      altMobile:    ['', [Validators.pattern(/^\d{10}$/)]],
      email:        ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      address:      ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
      city:         ['', Validators.required],
      state:        ['', Validators.required],
      pin:          ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      category:     ['', Validators.required],
      subCategory:  ['', Validators.required],
      incidentDate: ['', Validators.required],
      subject:      ['', [Validators.required, Validators.minLength(5),  Validators.maxLength(150)]],
      description:  ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      prevRef:      ['', [Validators.maxLength(20)]],
      declaration:  [true, Validators.requiredTrue],

      // ✅ Password fields
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).*')
      ]],
      confirmPassword: ['', Validators.required],

    }, { validators: this.passwordMatchValidator }); // ✅ STEP 3: group-level validator applied

    this.GetAllCategories();
    this.GetAllStates();

    // Category → SubCategory
    this.complaintForm.get('category')?.valueChanges.subscribe((categoryId: any) => {
      if (categoryId) {
        this.GetSubCategoriesByCategoryId(categoryId);
        this.complaintForm.get('subCategory')?.setValue('');
      } else {
        this.SubCategoryList = [];
      }
    });

    // State → Cities
    this.complaintForm.get('state')?.valueChanges.subscribe((stateId: any) => {
      if (stateId) {
        this.GetCitiesByStateId(stateId);
        this.complaintForm.get('city')?.setValue('');
      } else {
        this.CitiesList = [];
      }
    });
  }

  // ─── API CALLS ───────────────────────────────────────────

  GetAllCategories() {
    const spinner = document.getElementById('loader-spinner');
    if (spinner) spinner.style.display = 'block';
    this.userService.GetAllCategories().subscribe(
      (response: any) => { this.CategoryList = response;    if (spinner) spinner.style.display = 'none'; },
      (error: any)    => { console.error(error);            if (spinner) spinner.style.display = 'none'; }
    );
  }

  GetSubCategoriesByCategoryId(CategoryId: number) {
    const spinner = document.getElementById('loader-spinner');
    if (spinner) spinner.style.display = 'block';
    this.userService.GetSubCategoriesByCategoryId(CategoryId).subscribe(
      (response: any) => { this.SubCategoryList = response; if (spinner) spinner.style.display = 'none'; },
      (error: any)    => { console.error(error);            if (spinner) spinner.style.display = 'none'; }
    );
  }

  GetAllStates() {
    const spinner = document.getElementById('loader-spinner');
    if (spinner) spinner.style.display = 'block';
    this.userService.GetAllStates().subscribe(
      (response: any) => { this.StatesList = response;      if (spinner) spinner.style.display = 'none'; },
      (error: any)    => { console.error(error);            if (spinner) spinner.style.display = 'none'; }
    );
  }

  GetCitiesByStateId(StateId: number) {
    const spinner = document.getElementById('loader-spinner');
    if (spinner) spinner.style.display = 'block';
    this.userService.GetCitiesByStateId(StateId).subscribe(
      (response: any) => { this.CitiesList = response;      if (spinner) spinner.style.display = 'none'; },
      (error: any)    => { console.error(error);            if (spinner) spinner.style.display = 'none'; }
    );
  }

  // ─── FILE HANDLING ───────────────────────────────────────

  onFileSelect(event: any, type: 'identity' | 'support') {
    const file: File = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File must be less than 2MB');
      event.target.value = '';
      return;
    }

    this.convertToBase64(file).then((base64: string) => {
      if (type === 'identity') {
        this.identityFile      = file;
        this.identityFileName  = file.name;
        this.identityBase64    = base64;
        this.identityFileError = '';
      } else {
        this.supportFile     = file;
        this.supportFileName = file.name;
        this.supportBase64   = base64;
      }
    });
  }

  private convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload  = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // ─── SUBMIT ──────────────────────────────────────────────

  submitComplaint(): void {
    if (this.complaintForm.valid) {

      if (!this.identityFile) {
        alert('Please upload Identity Proof.');
        return;
      }

      if (!this.identityBase64) {
        alert('Please wait, file is still processing...');
        return;
      }

      const formData = this.complaintForm.value;

      const payload = {
        // Personal
        CP_Name:      formData.fullName,
        CP_FatherName: formData.guardianName ?? '',
        CP_DOB:       formData.dob,
        CP_Gender:    formData.gender,
        CP_Mobile:    formData.mobile,
        CP_AltMobile: formData.altMobile ?? '',
        CP_Email:     formData.email,
        CP_CatId:     Number(formData.category),
        CP_SubCatId:  Number(formData.subCategory),
        CP_Password:  formData.password,   // ✅ Send to API

        // Address
        Addr_Full:  formData.address,
        Addr_City:  String(formData.city),
        Addr_State: String(formData.state),
        Addr_Pin:   formData.pin,

        // Details
        CP_PrevRefNo: formData.prevRef ?? '',
        Det_Subject:  formData.subject,
        Det_Desc:     formData.description,
        Det_IncDate:  formData.incidentDate,

        // Documents
        IdentityDoc_Base64:    this.identityBase64    ?? '',
        IdentityDoc_FileName:  this.identityFileName  ?? '',
        IdentityDoc_Type:      'Identity',
        IdentityDoc_Name:      this.identityFileName  ?? '',
        IdentityDoc_Path:      '',
        IdentityDoc_SizeMB:    0,

        SupportDoc_Base64:     this.supportBase64     ?? '',
        SupportDoc_FileName:   this.supportFileName   ?? '',
        SupportDoc_Type:       'Supporting',
        SupportDoc_Name:       this.supportFileName   ?? '',
        SupportDoc_Path:       '',
        SupportDoc_SizeMB:     0
      };

      console.log('Payload:', payload);

      this.userService.InsertComplaint(payload).subscribe(
        (response: any) => {
          if (response.success) {
            alert('Complaint submitted! Reference No: ' + response.refNo);
            this.resetForm();
          } else {
            alert('Submission failed. Please try again.');
          }
        },
        (error: any) => {
          console.error('Submit Error:', error);
          alert('Failed to submit. Error: ' + error?.error?.message);
        }
      );

    } else {
      this.markAllTouched();
      const firstError = document.querySelector('.error-msg');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ─── HELPERS ─────────────────────────────────────────────

  private resetForm(): void {
    this.complaintForm.reset();
    this.SubCategoryList  = [];
    this.CitiesList       = [];
    this.identityFile     = null;
    this.identityFileName = '';
    this.identityBase64   = null;
    this.supportFile      = null;
    this.supportFileName  = '';
    this.supportBase64    = null;
  }

  private markAllTouched(): void {
    Object.values(this.complaintForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}