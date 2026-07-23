import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../shared/user.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { environmentprod } from '../../../../environments/environments.prod';

 const url = environment.apiUrl;
 const prod = environmentprod.apiUrl;
@Component({
  selector: 'app-all-complaint',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [UserService],
  templateUrl: './all-complaint.html',
  styleUrls: ['./all-complaint.css']
})


export class AllComplaint implements OnInit {

  private userService = inject(UserService);
  private router = inject(Router);        // ← inject Router

  isCollapsed = false;

  complaints: any[] = [];
  filteredComplaints: any[] = [];
  pagedComplaints: any[] = [];

  updatedStatus: any = '';
  updatedPriority: any = '';
  remark: string = '';
  // updatedepartment: Number = '';
  isUpdating = false;
  updateSuccess = false;

  isLoading = false;
  searchText = '';

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  statusList:      any[] = [];
  priorityList:      any[] = [];
  departmentList:      any[] = [];

  activeTab: string = 'personal';

  avatarClasses = ['av-purple', 'av-blue', 'av-green', 'av-pink', 'av-amber'];

  showModal: boolean = false;
  selectedComplaint: any = null;
  // baseUrl: string = 'http://localhost:8067';
  baseUrl : string = url;
  complaintDetails: any;





  updatedDepartment: number | null = null;

  ngOnInit(): void {
    this.GetAllComplaints();
    this.GetAllStatus();
    this.GetAllPriority();
    this.getAllDepartment();
  }

  GetAllComplaints() {
    this.isLoading = true;

    this.userService.GetAllComplaints().subscribe(
      (response: any) => {
        this.complaints = response;
        this.filteredComplaints = response;
        this.totalPages = Math.ceil(response.length / this.pageSize);
        this.setPage();
        this.isLoading = false;
        console.log('Complaint Data:', response);
      },
      (error: any) => {
        console.error('Complaint API Error:', error);
        this.isLoading = false;
      }
    );
  }

  onSearch() {
    const s = this.searchText.toLowerCase().trim();

    this.filteredComplaints = this.complaints.filter(x =>
      x.cP_Name?.toLowerCase().includes(s) ||
      x.cP_RefNo?.toLowerCase().includes(s) ||
      x.categoryName?.toLowerCase().includes(s)
    )

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredComplaints.length / this.pageSize);
    this.setPage();
  }

  setPage() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedComplaints = this.filteredComplaints.slice(start, start + this.pageSize);
  }

  goToPage(p: number) {
    this.currentPage = p;
    this.setPage();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPage();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPage();
    }
  }

  getPageEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredComplaints.length);
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getTotalCount(): number {
    return this.complaints.length;
  }

  getStatusCount(status: string): number {
    return this.complaints.filter(x => x.cP_Status === status).length;
  }

  getPriorityCount(priority: string): number {
    return this.complaints.filter(x => x.cP_Priority === priority).length;
  }




  
  getAvatarClass(index: number): string {
    return this.avatarClasses[index % this.avatarClasses.length];
  }

  getInitial(name: string): string {
    return name?.charAt(0)?.toUpperCase() || '?';
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  // openComplaintDetails(refNo: string) {
  //   this.userService.GetComplaintDetailsById(refNo).subscribe(
  //     (response: any) => {
  //       this.selectedComplaint = response;
  //       this.showModal = true;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching details:', error);
  //     }
  //   );
  // }

  closeModal() {
    this.showModal = false;
    this.selectedComplaint = null;
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    return this.baseUrl + path;
  }

  isPdf(path: string): boolean {
    return path?.toLowerCase().endsWith('.pdf');
  }

  onImgError(event: any) {
    event.target.style.display = 'none';
  }


  GetComplaintDetailsById(refNo: string) {
  this.userService.GetComplaintDetailsById(refNo).subscribe(
    (response: any) => {
      this.complaintDetails = response;
    },
    (error: any) => {
      console.error('Error:', error);
    }
  );
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

// GetAllStatus() {
//     this.userService.GetAllStatus().subscribe(
//         (response: any) => { this.statusList = response; },  // ← lowercase
//         (error: any)    => { console.error(error); }
//     );
// }

// GetAllPriority() {
//     this.userService.GetAllPriority().subscribe(
//         (response: any) => { this.priorityList = response; }, // ← lowercase
//         (error: any)    => { console.error(error); }
//     );
// }

// GetAllStatus() {
//     const spinner = document.getElementById('loader-spinner');
//     if (spinner) spinner.style.display = 'block';
//     this.userService.GetAllStatus().subscribe(
//         (response: any) => { this.statusList = response;   if (spinner) spinner.style.display = 'none'; },
//         (error: any)    => { console.error(error);         if (spinner) spinner.style.display = 'none'; }
//     );
// }

GetAllStatus() {
    this.userService.GetAllStatus().subscribe(
        (response: any) => { 
            this.statusList = response; 
            console.log('statusList:', this.statusList);  // ← add this
        },
        (error: any) => { console.error(error); }
    );
}

GetAllPriority() {
    const spinner = document.getElementById('loader-spinner');
    if (spinner) spinner.style.display = 'block';
    this.userService.GetAllPriority().subscribe(
        (response: any) => { this.priorityList = response; if (spinner) spinner.style.display = 'none'; },
        (error: any)    => { console.error(error);         if (spinner) spinner.style.display = 'none'; }
    );
}

  // Call on modal open
openModal(complaint: any) {
    this.selectedComplaint = complaint;
    this.showModal = true;
    this.updateSuccess = false;
    this.updatedStatus   = complaint.cP_StatusId ?? '';    // adjust field name
    this.updatedPriority = complaint.cP_PriorityId ?? '';  // adjust field name
    //  this.Remark = complaint.cP_PriorityId ?? '';  // adjust field name

    this.GetAllStatus();
    this.GetAllPriority();
}


// openComplaintDetails(refNo: string) {
//     this.userService.GetComplaintDetailsById(refNo).subscribe(
//         (response: any) => {
//             this.selectedComplaint = response;
//             this.updatedStatus   = '';   // reset on open
//             this.updatedPriority = '';   // reset on open
//             this.updateSuccess   = false;
//             this.showModal = true;
//         },
//         (error: any) => { console.error('Error fetching details:', error); }
//     );
// }

// Update
updateComplaint() {
    if (!this.updatedStatus || !this.updatedPriority) return;
    this.isUpdating = true;
    this.updateSuccess = false;

    const payload = {
        CP_RefNo:    this.selectedComplaint.cP_RefNo,
        Status_id:   Number(this.updatedStatus),
        Priority_id: Number(this.updatedPriority),
        departmentID: Number(this.updatedDepartment),
        Remarks: String(this.remark)
    };

    this.userService.UpdateStatusAndPriority(payload).subscribe(
        (response: any) => { this.isUpdating = false; this.updateSuccess = true; },
        (error: any)    => { this.isUpdating = false; console.error('Update error:', error); }
    );
}







openComplaintDetails(refNo: string) {
    this.userService.GetComplaintDetailsById(refNo).subscribe(
        (response: any) => {
            this.selectedComplaint = response;
            this.updatedStatus   = '';
            this.updatedPriority = '';
            this.updateSuccess   = false;
            this.activeTab       = 'personal'; // ← reset tab
            this.showModal = true;
        },
        (error: any) => { console.error('Error fetching details:', error); }
    );
}

}