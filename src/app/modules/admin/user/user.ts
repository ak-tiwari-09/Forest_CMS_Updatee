// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   imports: [],
//   templateUrl: './user.html',
//   styleUrl: './user.css',
// })
// export class User {

// }


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [FormsModule, RouterModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  fullName = '';
  email = '';
  mobile = '';
  role = '';
  department = '';
  password = '';
  confirmPassword = '';
  status: 'active' | 'inactive' = 'active';

  showPassword = false;
  showConfirmPassword = false;
  router: any;
  isCollapsed = false;

  onSaveUser() {
    if (this.password !== this.confirmPassword) {
      console.warn('Passwords do not match');
      return;
    }
    console.log('Saving user:', {
      fullName: this.fullName,
      email: this.email,
      mobile: this.mobile,
      role: this.role,
      department: this.department,
      status: this.status,
    });
    // TODO: call your user service here
  }

  onCancel() {
    // TODO: navigate back to the users list
  }

  
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

    toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}