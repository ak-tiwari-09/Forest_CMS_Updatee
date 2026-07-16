import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
constructor(private router: Router) {}

  goToLogin() {

    this.router.navigate(['/login']);
  }

  goToAdd() {

  this.router.navigate(['/add']); 
}

  goToLoginUser() {
        this.router.navigate(['/user-login']);
  }
  
  goToHome() {
        this.router.navigate(['/home']);
  }

  goToLoginDepartment() {
        this.router.navigate(['/department-login']);
  }
}

