import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8067/connect/token';
  // private baseUrl = 'https://cmsapi.esdinfra.com/connect/token';
  

  // CheckUserTypeAdmin(userName: string) {
  //   return this.http.get<any>(
  //     'http://localhost:8067/api/Complaint/CheckUserTypeAdmin?userName=' + userName
  //   );
  // }

  //   CheckUserTypeCustomer(userName: string) {
  //   return this.http.get<any>(
  //     'http://localhost:8067/api/Complaint/CheckUserTypeCustomer?userName=' + userName
  //   );
  // }

  //  CheckUserTypeAdmin(userName: string) {
  //   return this.http.get<any>(
  //     'https://cmsapi.esdinfra.com/api/Complaint/CheckUserTypeAdmin?userName=' + userName
  //   );
  // }

  //   CheckUserTypeCustomer(userName: string) {
  //   return this.http.get<any>(
  //     'https://cmsapi.esdinfra.com/api/Complaint/CheckUserTypeCustomer?userName=' + userName
  //   );
  // }

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    const body = new URLSearchParams();

    body.set('client_id', 'Global_spa');
    body.set('client_secret', 'secret');
    body.set('grant_type', 'phone_number_token');
    body.set('username', data.username);
    body.set('password', data.password);
    body.set('role', 'Admin');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.baseUrl, body.toString(), { headers });
  }
}