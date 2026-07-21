// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { UserService } from '../../../../shared/user.service';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'all-department',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './all-department.html',
//   styleUrl: './all-department.css',
// })
// export class AllDepartment implements OnInit {


//   departmentList: any[] = [];


//   constructor(
//     private userService: UserService,
//     private router: Router
//   ) {}



//   ngOnInit(): void {

//     this.getAllDepartment();

//   }




//   getAllDepartment() {

//     this.userService.GetAllDepartment().subscribe({

//       next: (res: any) => {

//         this.departmentList = res;

//       },


//       error: (err) => {

//         console.log(
//           "Error while loading department",
//           err
//         );

//       }

//     });

//   }




//   addDepartment() {

//     this.router.navigate([
//       '/admin/all-department'
//     ]);

//   }



// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../shared/user.service';


@Component({
  selector: 'all-department',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './all-department.html',
  styleUrl: './all-department.css',
})
export class AllDepartment implements OnInit {


  departmentList: any[] = [];


  constructor(
    private userService: UserService,
    private router: Router
  ) {}



  ngOnInit(): void {

    this.getAllDepartment();

  }




  getAllDepartment() {


    this.userService.GetAllDepartment()
    .subscribe({

      next:(res:any)=>{


        this.departmentList = res;


      },


      error:(err)=>{


        console.log(
          "Error while loading department",
          err
        );


      }


    });


  }





  addDepartment(){
    this.router.navigate([
      '/admin/department'
    ]);


  }



}