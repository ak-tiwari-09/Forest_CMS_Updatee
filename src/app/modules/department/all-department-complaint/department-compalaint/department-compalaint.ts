import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../../shared/user.service';
import { environment } from '../../../../../environments/environments';

const url = environment.apiUrl;

export interface Complaint {
  cP_RefNo: string;
  cP_Name: string;
  cP_FatherName?: string;
  cP_DOB?: string;
  cP_Gender?: string;

  cP_Mobile?: string;
  cP_Email?: string;

  cP_Status: string;
  cP_Priority: string;
  cP_CreatedAt: string;

  categoryName?: string;
  category_Name?: string;

  subCategoriesName?: string;

  addr_Full?: string;
  addr_City?: string;
  addr_State?: string;
  addr_Pin?: string;

  det_Subject?: string;
  det_Desc?: string;
  det_IncDate?: string;

  identityDoc_Path?: string;
  identityDoc_Name?: string;

  supportDoc_Path?: string;
  supportDoc_Name?: string;
}

@Component({
  selector: 'department-complaint',
  imports: [CommonModule, RouterModule],
  providers: [UserService],
  templateUrl: 'department-compalaint.html',
  styleUrl: './department-compalaint.css',
})
export class DepartmentComplaint implements OnInit {
  private router = inject(Router);

  isCollapsed = false;
  isLoading = true;

  complaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  showModal = false;
  selectedComplaint: Complaint | null = null;

  baseUrl = url;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const departmentName = localStorage.getItem('userName');

    if (!departmentName) {
      console.error('Department user not found');
      this.router.navigate(['/department-login']);
      return;
    }

    // Not auto-fetching on load anymore — API isn't ready yet.
    // Complaints are loaded when the user clicks the "Load Complaints" button.
    this.isLoading = false;
  }

  // ==========================
  // GET DEPARTMENT COMPLAINTS
  // ==========================

  // Triggered by a button click in the template instead of ngOnInit.
  GetDepartmentComplaintDetails() {
    const departmentName = localStorage.getItem('userName');

    if (!departmentName) {
      console.error('Department user not found');
      this.router.navigate(['/department-login']);
      return;
    }

    this.isLoading = true;

    // ---------------------------------------------------------
    // TEMP: mock data since the backend API doesn't exist yet.
    // Once your API is ready, replace this block with:
    //
    // this.userService.GetDepartmentComplaints(departmentName).subscribe({
    //   next: (response: any) => {
    //     if (response.message === 'success' && response.data) {
    //       this.complaints = response.data;
    //       this.filteredComplaints = [...this.complaints];
    //       this.calcPagination();
    //     } else {
    //       this.complaints = [];
    //       this.filteredComplaints = [];
    //     }
    //     this.isLoading = false;
    //   },
    //   error: (error: any) => {
    //     console.error(error);
    //     this.complaints = [];
    //     this.filteredComplaints = [];
    //     this.isLoading = false;
    //   },
    // });
    // ---------------------------------------------------------

    setTimeout(() => {
      this.complaints = this.getMockComplaints();
      this.filteredComplaints = [...this.complaints];
      this.calcPagination();
      this.isLoading = false;
    }, 500);
  }

  private getMockComplaints(): Complaint[] {
    return [
      {
        cP_RefNo: 'FC-2026-0001',
        cP_Name: 'Ravi Kumar',
        cP_Status: 'Pending',
        cP_Priority: 'High',
        cP_CreatedAt: '2026-07-01',
        categoryName: 'Illegal Logging',
        det_Subject: 'Trees cut near reserve boundary',
      },
      {
        cP_RefNo: 'FC-2026-0002',
        cP_Name: 'Anita Sharma',
        cP_Status: 'In Progress',
        cP_Priority: 'Medium',
        cP_CreatedAt: '2026-07-05',
        categoryName: 'Wildlife Sighting',
        det_Subject: 'Leopard seen near village outskirts',
      },
      {
        cP_RefNo: 'FC-2026-0003',
        cP_Name: 'Suresh Patil',
        cP_Status: 'Resolved',
        cP_Priority: 'Low',
        cP_CreatedAt: '2026-06-20',
        categoryName: 'Encroachment',
        det_Subject: 'Fencing extended into forest land',
      },
    ];
  }

  // ==========================
  // SIDEBAR
  // ==========================

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // ==========================
  // LOGOUT
  // ==========================

  logout() {
    localStorage.clear();
    this.router.navigate(['/department-login']);
  }

  // ==========================
  // STATUS COUNT / FILTER
  // ==========================

  getStatusCount(status: string) {
    return this.complaints.filter((x) => x.cP_Status === status).length;
  }

  filterByStatus(status: string | null) {
    if (!status) {
      this.filteredComplaints = [...this.complaints];
    } else {
      this.filteredComplaints = this.complaints.filter(
        (x) => x.cP_Status === status,
      );
    }
    this.calcPagination();
  }

  // ==========================
  // PAGINATION
  // ==========================

  get pagedComplaints() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredComplaints.slice(start, start + this.pageSize);
  }

  calcPagination() {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.filteredComplaints.length / this.pageSize),
    );
    this.currentPage = 1;
  }

  totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getPageEnd() {
    return Math.min(
      this.currentPage * this.pageSize,
      this.filteredComplaints.length,
    );
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  // ==========================
  // MODAL
  // ==========================

  openComplaintDetails(refNo: string) {
    this.selectedComplaint =
      this.complaints.find((x) => x.cP_RefNo === refNo) || null;

    if (this.selectedComplaint) {
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedComplaint = null;
  }

  // ==========================
  // DOCUMENTS
  // ==========================

  getImageUrl(path: string) {
    return `${this.baseUrl}/${path}`;
  }

  isPdf(path: string) {
    return path?.toLowerCase().endsWith('.pdf');
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}