import { Component } from '@angular/core';
import { AuthService } from '../../../../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../../shared/user.service';
import { Navbar } from '../../../../navbar/navbar';

@Component({
  selector: 'app-department-login',
  imports: [FormsModule, Navbar],
  templateUrl: './department-login.html',
  styleUrl: './department-login.css',
})
export class DepartmentLogin {

  username: string = '';
  password: string = '';
  loading = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  onLoginDepartment() {

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

        console.log('Department Login Success:', res);

        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('userName', res.userName);

        this.loading = false;

        // Navigate to Department Complaint page
        this.router.navigate(['/department-complaint']);
      },

      error: (err: any) => {
        console.error(err);
        this.errorMsg = 'Invalid username or password';
        this.loading = false;
      }
    });
  }

   goToHo() {
    this.router.navigate(['/department-complaint']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToUserLogin() {
    this.router.navigate(['/user-login']);
  }

}