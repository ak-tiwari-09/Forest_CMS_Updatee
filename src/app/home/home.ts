import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-home',
  imports: [Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router) {}
   
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToAdd() {
         // debugger;
  this.router.navigate(['/add']); 
}

  goToLoginUser() {
        this.router.navigate(['/user-login']);
  } 

    goToLoginDepartment() {
        this.router.navigate(['/department-login']);
  }

}
