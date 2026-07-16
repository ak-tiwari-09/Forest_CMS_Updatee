import { Routes } from '@angular/router';
import { AddComplaintComponent } from './modules/user/add-complaint/add-complaint';
import { Login } from './modules/login-register/login/login';
import { Dashbroad } from './modules/admin/dashbroad/dashbroad';
import { AllComplaint } from './modules/admin/all-complaint/all-complaint';
import { UserLogin } from './modules/user/user-login/user-login';
import { MyComplaints } from './modules/user/my-complaints/my-complaints';
import { DepartmentLogin } from './modules/department/department-login/department-login/department-login';
import { DepartmentComplaint } from './modules/department/all-department-complaint/department-compalaint/department-compalaint';
import { App } from './app';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home }, 
  { path: 'add', component: AddComplaintComponent },
  { path: 'login', component: Login },
  { path: 'user-login', component: UserLogin},
  { path: 'department-login', component: DepartmentLogin },
   { path: 'department-complaint', component: DepartmentComplaint },
  { path: 'dashboard', component: Dashbroad },
  { path: 'admin/all-complaint', component: AllComplaint },
  { path: 'user/my-complaint',component: MyComplaints}
  
];