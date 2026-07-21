// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterLink, RouterModule } from '@angular/router';

// @Component({
//   selector: 'all-user',
//   imports: [FormsModule, RouterModule],
//   templateUrl: './all-user.html',
//   styleUrl: './all-user.css',
// })
// export class AllUser {
//     router: any;

//     logout() {
//     localStorage.clear();
//     this.router.navigate(['/login']);



    
//   }

// }


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'all-user',
 imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './all-user.html',
  styleUrl: './all-user.css',
})
export class AllUser {

  isSidebarCollapsed = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}