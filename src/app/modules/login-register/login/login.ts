import { Component } from '@angular/core';
import { AuthService } from '../../../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  username: string = '';
  password: string = '';
  loading = false;
  errorMsg = '';
  complaintService: any;

  constructor(private authService: AuthService, private router: Router ,  private userService: UserService,   ) { }

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
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.errorMsg = 'Invalid credentials';
  //       this.loading = false;
  //     }
  //   });
  // }

  onLogin() {
    this.userService.CheckUserTypeAdmin(this.username)
      .subscribe({
        next: (checkRes: any) => {
          if (checkRes.message !== 'success') {
            this.errorMsg = 'Access denied. Not an admin user.';
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
              localStorage.setItem('access_token', res.access_token);
              localStorage.setItem('user', JSON.stringify(res));
              this.router.navigate(['/admin/dashboard']);
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
  goToUserLogin() {
    this.router.navigate(['/user-login']);
  }

}
