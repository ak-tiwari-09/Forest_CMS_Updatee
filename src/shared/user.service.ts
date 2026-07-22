import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    rootUrl: string = 'http://localhost:8067';
    // rootUrl: string = 'https://cmsapi.esdinfra.com';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    GetAllCategories() {
        return this.http.get(this.rootUrl + '/api/Categories/GetAllCategories', this.httpOptions);
    }

    GetSubCategoriesByCategoryId(CategoryId: number) {
        return this.http.get(this.rootUrl + '/api/Categories/GetSubCategoriesByCategoryId/' + CategoryId, this.httpOptions);
    }

    GetAllStates() {
        return this.http.get(this.rootUrl + '/api/StatesAndCities/GetAllStates', this.httpOptions);
    }

    GetCitiesByStateId(state_id: number) {

        return this.http.get(this.rootUrl + '/api/StatesAndCities/GetCitiesbystate_id/' + state_id, this.httpOptions);
    }


    // InsertComplaint(payload: any) {
    //      // debugger;
    //     return this.http.post(
    //         this.rootUrl + '/api/Complaint/InsertComplaint',
    //         payload,
    //         this.httpOptions  
    //     );
    // }

    InsertComplaint(payload: any) {
        return this.http.post(
            this.rootUrl + '/api/Complaint/InsertComplaint',
            payload,
            this.httpOptions  // ✅ application/json
        );
    }

    GetAllComplaints() {
         // debugger;
        return this.http.get(this.rootUrl + '/api/Complaint/GetAllComplaintDetails', this.httpOptions);
    }


    GetComplaintDetailsById(refNo: string) {
        return this.http.get(
            this.rootUrl + '/api/Complaint/GetComplaintDetailsById/' + refNo,
            this.httpOptions
        );
    }

    CheckUserTypeAdmin(userName: string) {
        //  // debugger;
        return this.http.get<any>(
            this.rootUrl + '/api/Complaint/CheckUserTypeAdmin?userName=' + userName,
            this.httpOptions
        );
    }


    CheckUserTypeCustomer(userName: string) {
        return this.http.get<any>(
            this.rootUrl + '/api/Complaint/CheckUserTypeCustomer?userName=' + userName,
            this.httpOptions
        );
    }

    GetComplaintDetailsBy(userName: string) {
        return this.http.get(
            this.rootUrl + '/api/Complaint/GetComplaintDetailsBy/' + userName,
            this.httpOptions
        );
    }
 
    GetAllStatus() {
        //  // debugger;
        return this.http.get(this.rootUrl + '/api/Complaint/GetAllStatus', this.httpOptions);
    }

    GetAllPriority() {
        //  // debugger;
        return this.http.get(this.rootUrl + '/api/Complaint/GetAllPriority', this.httpOptions);
    } 


    GetAllDepartment() {

        return this.http.get<any[]>(
            this.rootUrl + '/api/Complaint/GetAllDepartment',
            this.httpOptions
        );

    }



    UpdateStatusAndPriority(payload: any) {
         // debugger;
    return this.http.post(this.rootUrl + '/api/Complaint/UpdateStatusAndPriority', payload, this.httpOptions);
    }

    

}