import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'department',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {

  departmentList: any[] = [];

  isSaving: boolean = false;
  errorMsg: string = '';
  successMsg: string = '';

  department = {
    departmentID: 0,
    departmentName: '',
    departmentCode: '',
    contactEmail: '',
    contactPhone: '',
    isActive: true
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDepartment();
  }

  getAllDepartment() {
    this.userService.GetAllDepartment().subscribe({
      next: (res: any) => {
        this.departmentList = res;
      },
      error: (err) => {
        console.log("Error while loading department", err);
      }
    });
  }

  addDepartment() {

    if (!this.department.departmentName.trim() || !this.department.departmentCode.trim()) {
      this.errorMsg = 'Department Name and Code are required.';
      this.successMsg = '';
      return;
    }

    this.isSaving = true;
    this.errorMsg = '';
    this.successMsg = '';

    const payload = {
      departmentID: 0,
      departmentName: this.department.departmentName,
      departmentCode: this.department.departmentCode,
      contactEmail: this.department.contactEmail,
      contactPhone: this.department.contactPhone,
      isActive: this.department.isActive
    };

    this.userService.AddDepartment(payload).subscribe({
      next: (res: any) => {
        this.isSaving = false;

        if (res?.success || res?.Success) {
          this.successMsg = res.message || res.Message || 'Department Added Successfully';
          this.resetForm();
          this.getAllDepartment();

          setTimeout(() => {
            this.router.navigate(['/admin/all-department']);
          }, 1000);
        } else {
          this.errorMsg = res?.message || res?.Message || 'Failed to add department.';
        }
      },
      error: (err) => {
        console.log("Error while adding department", err);
        this.isSaving = false;
        this.errorMsg = 'Something went wrong while adding the department.';
      }
    });
  }

  resetForm() {
    this.department = {
      departmentID: 0,
      departmentName: '',
      departmentCode: '',
      contactEmail: '',
      contactPhone: '',
      isActive: true
    };
  }

}