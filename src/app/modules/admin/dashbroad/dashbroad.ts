import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../shared/user.service';  // adjust path if needed

@Component({
  selector: 'dashbroad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashbroad.html',
  styleUrl: './dashbroad.css',
})
export class Dashbroad implements OnInit {

  private userService = inject(UserService);

  user: any;
  isCollapsed = false;

  totalComplaints: any;
  resolvedPercentage: any;
  resolvedComplaints: any;
  resolutionRate: any;

  recentComplaints: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {

    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;

    this.GetAllComplaints();

  }


  GetAllComplaints() {

    this.userService.GetAllComplaints().subscribe(
      (response: any) => {

        console.log("Dashboard Complaint Data:", response);

        // Show latest 5 complaints
        this.recentComplaints = response.slice(0, 5);

        // Total count
        this.totalComplaints = response.length;

      },
      (error: any) => {

        console.error("Complaint API Error:", error);

      }
    );

  }


  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}