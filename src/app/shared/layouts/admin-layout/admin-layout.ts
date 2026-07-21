// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-layout',
//   imports: [],
//   templateUrl: './admin-layout.html',
//   styleUrl: './admin-layout.css',
// })
// export class AdminLayout {

// }
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../sidebar/sidebar';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

}