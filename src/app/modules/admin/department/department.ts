import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { UserService } from '../services/user.service';
import { UserService } from '../../../../shared/user.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'department',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {

  departmentList: any[] = [];

  department = {
    DepartmentName: '',
    DepartmentCode: '',
    ParentDepartmentID_Fk: null,
    JurisdictionType: 'State',
    ContactEmail: '',
    ContactPhone: '',
    IsActive: true
  };


  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.getAllDepartment();
  }


  getAllDepartment() {

    this.userService.GetAllDepartment().subscribe({
      next: (res: any) => {

        this.departmentList = res;

      },
      error: (err) => {
        console.log("Error while loading department", err);
      }
    });

  }


  // addDepartment() {

  //   this.userService.AddDepartment(this.department).subscribe({
  //     next: (res: any) => {

  //       alert("Department added successfully");

  //       this.getAllDepartment();

  //       this.department = {
  //         DepartmentName: '',
  //         DepartmentCode: '',
  //         ParentDepartmentID_Fk: null,
  //         JurisdictionType: 'State',
  //         ContactEmail: '',
  //         ContactPhone: '',
  //         IsActive: true
  //       };

  //     },
  //     error: (err) => {
  //       console.log("Error while adding department", err);
  //     }
  //   });

  // }

}