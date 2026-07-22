import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../shared/user.service';



 

export interface Department {
  departmentID: number;
  departmentName: string;
  departmentCode: string;
  parentDepartmentID_Fk: number | null;
  // jurisdictionType: string;
  contactEmail: string | null;
  contactPhone: string | null;
  isActive: boolean;
  createdDate: string;
}
  
@Component({
  selector: 'all-department',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './all-department.html',
  styleUrl: './all-department.css',
})
export class AllDepartment implements OnInit {

  departmentList: Department[] = [];
  isLoading: boolean = false;
  errorMsg: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDepartment();
  }

  getAllDepartment() {
    this.isLoading = true;
    this.errorMsg = '';

    this.userService.GetAllDepartment().subscribe({
      next: (res: Department[]) => {
        this.departmentList = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log("Error while loading department", err);
        this.errorMsg = 'Failed to load departments. Please try again.';
        this.isLoading = false;
      }
    });
  }

  addDepartment() {
    this.router.navigate(['/admin/department']);
  }

}