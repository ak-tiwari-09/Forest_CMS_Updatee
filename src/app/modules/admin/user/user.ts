// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user',
//   imports: [],
//   templateUrl: './user.html',
//   styleUrl: './user.css',
// })
// export class User {

// }


// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-user',
//   imports: [FormsModule, RouterModule],
//   templateUrl: './user.html',
//   styleUrl: './user.css',
// })
// export class User {
//   fullName = '';
//   email = '';
//   mobile = '';
//   role = '';
//   department = '';
//   password = '';
//   confirmPassword = '';
//   status: 'active' | 'inactive' = 'active';

//   showPassword = false;
//   showConfirmPassword = false;
//   router: any;
//   isCollapsed = false;
// user: any;

//   onSaveUser() {
//     if (this.password !== this.confirmPassword) {
//       console.warn('Passwords do not match');
//       return;
//     }
//     console.log('Saving user:', {
//       fullName: this.fullName,
//       email: this.email,
//       mobile: this.mobile,
//       role: this.role,
//       department: this.department,
//       status: this.status,
//     });
   
//   }

//   onCancel() {
    
//   }

  
//   logout() {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }

//     toggleSidebar() {
//     this.isCollapsed = !this.isCollapsed;
//   }

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit {

  departmentList: any[] = [];
  roleList: any[] = [];

  user: any = {

    FullName: '',
    Email: '',
    Mobile: '',
    Password: '',
    ConfirmPassword: '',
    RoleId: '',
    DepartmentID: null,
    IsActive: true

  };

  showPassword = false;
  showConfirmPassword = false;
  isCollapsed = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllDepartment();

    // this.getAllRole();

  }

  //============================

  getAllDepartment() {

    this.userService.GetAllDepartment()

      .subscribe({

        next: (res: any) => {

          this.departmentList = res;

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  //============================

  // getAllRole() {

  //   this.userService.GetAllRole()

  //     .subscribe({

  //       next: (res: any) => {

  //         this.roleList = res;

  //       },

  //       error: (err: any) => {

  //         console.log(err);

  //       }

  //     });

  // }

  //============================

  saveUser() {

    if (this.user.Password != this.user.ConfirmPassword) {

      alert("Password and Confirm Password do not match.");

      return;

    }

    this.userService.InsertDepartmentUser(this.user)

      .subscribe({

        next: (res: any) => {

          if (res.success) {

            alert(res.message);

            this.router.navigate(['/admin/all-user']);

          }
          else {

            alert(res.message);

          }

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  //============================

  onCancel() {

    this.router.navigate(['/admin/all-user']);

  }

  //============================

  logout() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

  //============================

  toggleSidebar() {

    this.isCollapsed = !this.isCollapsed;

  }

}