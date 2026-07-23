// // import { Component } from '@angular/core';
// // import { FormsModule } from '@angular/forms';
// // import { RouterLink, RouterModule } from '@angular/router';

// // @Component({
// //   selector: 'all-user',
// //   imports: [FormsModule, RouterModule],
// //   templateUrl: './all-user.html',
// //   styleUrl: './all-user.css',
// // })
// // export class AllUser {
// //     router: any;

// //     logout() {
// //     localStorage.clear();
// //     this.router.navigate(['/login']);



    
// //   }

// // }


// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'all-user',
//  imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './all-user.html',
//   styleUrl: './all-user.css',
// })
// export class AllUser {

//   isSidebarCollapsed = false;

//   constructor(private router: Router) {}


//   toggleSidebar() {
//     this.isSidebarCollapsed = !this.isSidebarCollapsed;
//   }

  

//   logout() {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'all-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './all-user.html',
  styleUrl: './all-user.css',
})
export class AllUser implements OnInit {

  userList: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUserDetails();
  }

  getAllUserDetails() {

    this.userService.GetAllUserDetails()
      .subscribe({
        next: (res: any) => {
          this.userList = res;
        },
        error: (err: any) => {
          console.log(
            "Error while loading users",
            err
          );
        }
      });

  }

getAvatarClass(index: number) {
  const classes = [
    'av-purple',
    'av-blue',
    'av-green',
    'av-pink',
    'av-amber'
  ];

  return classes[index % classes.length];

}

  addUser() {
    this.router.navigate(['/admin/user']);
  }

}