// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { Navbar } from "./navbar/navbar";
// import { Footer } from "./footer/footer";
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, ReactiveFormsModule],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected title = 'ComplainMgmt';

// }


import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';  // ← add RouterModule
import { ReactiveFormsModule } from '@angular/forms';
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, ReactiveFormsModule, Navbar],  // ← add RouterModule here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private router: Router) {}
  protected title = 'ComplainMgmt';


  
  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToAdd() {
        debugger;
  this.router.navigate(['/add']); 
}

  goToLoginUser() {
        this.router.navigate(['/user-login']);
  } 

}

