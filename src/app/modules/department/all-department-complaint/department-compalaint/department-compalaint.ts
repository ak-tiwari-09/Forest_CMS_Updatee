import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../../shared/user.service';

export interface Complaint {
  cP_RefNo: string;
  cP_Name: string;
  cP_CatId?: number;
  categoryName?: string;
  cP_Priority: string;
  cP_Status: string;
  cP_CreatedAt: string;
  det_IncDate?: string;
}

@Component({
  selector: 'department-complaint',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [UserService],
  templateUrl: './department-compalaint.html',
  styleUrl: './department-compalaint.css'
})
export class DepartmentComplaint implements OnInit {

  private router = inject(Router);

  isCollapsed = false;
  isLoading = false;

  filteredComplaints: Complaint[] = [];

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    const userName = localStorage.getItem('userName');

    if (!userName) {
      this.router.navigate(['/department-login']);
      return;
    }

    this.loadDepartmentComplaints(userName);

  }

  loadDepartmentComplaints(userName: string): void {

    this.isLoading = true;

    this.userService.CheckUserTypeDepartment(userName).subscribe({

      next: (response: any) => {

        if (
          response &&
          response.message === 'success' &&
          response.data &&
          response.data.length > 0
        ) {

          const department = response.data[0];

          const userId = department.userId;
          const roleId = department.roleId;
          const departmentID = department.departmentID;

          this.loadComplaintList(userId, roleId, departmentID);

        } else {

          this.filteredComplaints = [];
          this.calcPagination();
          this.isLoading = false;

        }

      },

      error: (err) => {

        console.error('Department Details Error', err);

        this.filteredComplaints = [];
        this.isLoading = false;

      }

    });

  }

  loadComplaintList(
    userId: string,
    roleId: string,
    departmentID: number
  ): void {

    this.userService
      .GetAllComplaintDetailsbyDepartment(
        userId,
        roleId,
        departmentID
      )
      .subscribe({

        next: (response: any) => {

          this.filteredComplaints = response || [];

          this.calcPagination();

          this.isLoading = false;

        },

        error: (err) => {

          console.error('Complaint List Error', err);

          this.filteredComplaints = [];

          this.calcPagination();

          this.isLoading = false;

        }

      });

  }

  toggleSidebar(): void {

    this.isCollapsed = !this.isCollapsed;

  }

  logout(): void {

    localStorage.clear();

    this.router.navigate(['/department-login']);

  }

  get pagedComplaints(): Complaint[] {

    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredComplaints.slice(
      start,
      start + this.pageSize
    );

  }

  calcPagination(): void {

    this.totalPages = Math.max(
      1,
      Math.ceil(this.filteredComplaints.length / this.pageSize)
    );

    this.currentPage = 1;

  }

  totalPagesArray(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );

  }

  getPageEnd(): number {

    return Math.min(
      this.currentPage * this.pageSize,
      this.filteredComplaints.length
    );

  }

  prevPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

    }

  }

  nextPage(): void {

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

    }

  }

  goToPage(page: number): void {

    this.currentPage = page;

  }

}