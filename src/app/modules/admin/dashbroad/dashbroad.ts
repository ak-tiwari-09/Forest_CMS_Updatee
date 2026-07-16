import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // ← add RouterModule

@Component({
  selector: 'app-dashbroad',
  standalone: true,
  imports: [RouterModule],  // ← add here
  templateUrl: './dashbroad.html',
  styleUrl: './dashbroad.css',
})
export class Dashbroad implements OnInit {

  user: any;
  isCollapsed = false; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    this.user = data ? JSON.parse(data) : null;
  }

   toggleSidebar() {        // ← add this
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}