// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-login',
//   imports: [],
//   templateUrl: './user-login.html',
//   styleUrl: './user-login.css',
// })
// export class UserLogin {

// }


import { Component } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/user.service';
import { Navbar } from "../../../navbar/navbar";

@Component({
  selector: 'app-user-login',
  imports: [FormsModule, Navbar],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {


  username: string = '';
  password: string = '';
  loading = false;
  errorMsg = '';

  constructor(private authService: AuthService ,private router: Router , private userService: UserService) {}

  // onLogin() {
  //   if (!this.username || !this.password) {
  //     this.errorMsg = 'Username and Password required';
  //     return;
  //   }

  //   this.loading = true;
  //   this.errorMsg = '';

  //   const payload = {
  //     username: this.username,
  //     password: this.password
  //   };

  //   this.authService.login(payload).subscribe({
  //     next: (res) => {
  //       console.log('Login Success:', res);

  //       // ✅ Store token
  //       localStorage.setItem('access_token', res.access_token);
  //       localStorage.setItem('user', JSON.stringify(res));

  //       // 👉 redirect (you can change route)
  //       this.router.navigate(['user/my-complaint']);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.errorMsg = 'Invalid credentials';
  //       this.loading = false;
  //     }
  //   });
  // }


  // onLoginUser() {
  //   this.userService.CheckUserTypeCustomer(this.username)
  //     .subscribe({
  //       next: (checkRes: any) => {
  //         if (checkRes.message !== 'success') {
  //           this.errorMsg = 'Access denied. Not an Customer user.';
  //           return;
  //         } 

  //         if (!this.username || !this.password) {
  //           this.errorMsg = 'Username and Password required';
  //           return;
  //         }

  //         this.loading = true;
  //         this.errorMsg = '';

  //         const payload = {
  //           username: this.username,
  //           password: this.password
  //         };

  //         this.authService.login(payload).subscribe({
  //           next: (res: any) => {
  //             console.log('Login Success:', res);
  //             localStorage.setItem('access_token', res.access_token);
  //             localStorage.setItem('user', JSON.stringify(res));
  //             localStorage.setItem('userName', JSON.stringify(res));
  //             this.router.navigate(['user/my-complaint']);
  //           },
  //           error: (err: any) => {
  //             console.error(err);
  //             this.errorMsg = 'Invalid credentials';
  //             this.loading = false;
  //           }
  //         });
  //       },
  //       error: (err: any) => {
  //         console.error(err);
  //         this.errorMsg = 'User not authorized or server error.';
  //       }
  //     });
  // }


  onLoginUser() {
  this.userService.CheckUserTypeCustomer(this.username)
    .subscribe({
      next: (checkRes: any) => {
        if (checkRes.message !== 'success') {
          this.errorMsg = 'Access denied. Not a Customer user.';
          return;
        }

        if (!this.username || !this.password) {
          this.errorMsg = 'Username and Password required';
          return;
        }

        this.loading = true;
        this.errorMsg = '';

        const payload = {
          username: this.username,
          password: this.password
        };

        this.authService.login(payload).subscribe({
          next: (res: any) => {
            console.log('Login Success:', res);

            // ✅ Store access_token
            localStorage.setItem('access_token', res.access_token);

            // ✅ Store full user object as JSON string
            localStorage.setItem('user', JSON.stringify(res));

            // ✅ Store userName as a plain string (NOT JSON.stringify of entire res)
            localStorage.setItem('userName', res.userName);

            this.router.navigate(['user/my-complaint']);
          },
          error: (err: any) => {
            console.error(err);
            this.errorMsg = 'Invalid credentials';
            this.loading = false;
          }
        });
      },
      error: (err: any) => {
        console.error(err);
        this.errorMsg = 'User not authorized or server error.';
      }
    });
}




  goToHome() {
        this.router.navigate(['/home']);
  }

  goToAdminLogin() {
    this.router.navigate(['/login']);
  }

}
