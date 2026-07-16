import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { environment } from '../../../../environments/environments';
import { environmentprod } from '../../../../environments/environments.prod';

const url = environment.apiUrl;
const prod = environmentprod.apiUrl;

export interface Complaint {
  cP_RefNo: string;
  cP_Name: string;
  cP_FatherName: string;
  cP_DOB: string;
  cP_Gender: string;
  cP_Mobile: string;
  cP_AltMobile?: string;
  cP_Email?: string;
  cP_Status: string;
  cP_Priority: string;
  cP_CreatedAt: string;
  cP_PrevRefNo?: string;
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
  selector: 'app-my-complaints',
  imports: [CommonModule, RouterModule],
  providers: [UserService],
  templateUrl: './my-complaints.html',
  styleUrl: './my-complaints.css',
})
export class MyComplaints implements OnInit {

  private router = inject(Router);

  isCollapsed = false;
  isLoading = true;

  // ✅ These arrays are used by the HTML template
  complaints: Complaint[] = [];
  filteredComplaints: Complaint[] = [];

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  showModal = false;
  selectedComplaint: Complaint | null = null;

  private avatarClasses = ['av-purple', 'av-blue', 'av-green', 'av-pink', 'av-amber'];

  baseUrl: string = url;
  refNo: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ Get userName from localStorage (NOT from route params)
    const userName = localStorage.getItem('userName');

    if (userName) {
      this.refNo = userName;
      this.GetComplaintDetailsBy(this.refNo);
    } else {
      console.error('No userName found in localStorage.');
      this.isLoading = false;
      this.router.navigate(['/login']);
    }
  }

  // ✅ FIXED: Extract data array from response and assign to correct variables
  GetComplaintDetailsBy(refNo: string) {
    this.isLoading = true;

    this.userService.GetComplaintDetailsBy(refNo).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        // ✅ API returns: { message: "success", data: [...] }
        // ✅ Extract the "data" array from response
        if (response.message === 'success' && response.data) {
          this.complaints = response.data;
          this.filteredComplaints = [...this.complaints];
          this.calcPagination();
        } else {
          this.complaints = [];
          this.filteredComplaints = [];
        }

        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.complaints = [];
        this.filteredComplaints = [];
        this.isLoading = false;
      }
    });
  }

  // ── Sidebar ───────
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  // ── Logout ─────
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/user-login']);
  }

  // ── Stat helpers ────────
  getStatusCount(status: string): number {
    return this.complaints.filter(c => c.cP_Status === status).length;
  }

  getPriorityCount(priority: string): number {
    return this.complaints.filter(c => c.cP_Priority === priority).length;
  }

  // ── Avatar ─────────
  getAvatarClass(index: number): string {
    return this.avatarClasses[index % this.avatarClasses.length];
  }

  // ── Pagination ────────
  get pagedComplaints(): Complaint[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredComplaints.slice(start, start + this.pageSize);
  }

  calcPagination(): void {
    this.totalPages = Math.max(
      1,
      Math.ceil(this.filteredComplaints.length / this.pageSize)
    );
    this.currentPage = 1;
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getPageEnd(): number {
    return Math.min(
      this.currentPage * this.pageSize,
      this.filteredComplaints.length
    );
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  // ── Modal ────────
  openComplaintDetails(refNo: string): void {
    this.selectedComplaint =
      this.complaints.find(c => c.cP_RefNo === refNo) || null;
    if (this.selectedComplaint) this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedComplaint = null;
  }

  // ── Document helpers ─────────
  getImageUrl(path: string): string {
    return `${this.baseUrl}/${path}`;
  }

  isPdf(path: string): boolean {
    return path?.toLowerCase().endsWith('.pdf');
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}