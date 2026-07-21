// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   imports: [],
//   templateUrl: './sidebar.html',
//   styleUrl: './sidebar.css',
// })
// export class Sidebar {

// }


import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  isCollapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    // TODO: clear auth/session storage here if you have any, e.g.
    // localStorage.removeItem('token');
    this.router.navigate(['/login-register']);
  }
}