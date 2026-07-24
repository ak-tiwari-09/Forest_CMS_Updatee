// import { Component, OnInit, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { UserService } from '../../../../../shared/user.service';

// export interface DepartmentUser {
//   departmentID:number;
//   departmentName:string;
//   userId:string;
//   roleId:string;
//   dpMobile:string;
//   firstName:string;
//   lastName:string;
//   userName:string;
//   email:string;
// }

// export interface Complaint {
//   cP_RefNo:string;
//   cP_Name:string;
//   cP_CatId?:number;
//   categoryName?:string;
//   cP_Priority:string;
//   cP_Status:string;
//   cP_CreatedAt:string;
//   det_IncDate?:string;
// }

// @Component({
//   selector:'department-complaint',
//   standalone:true,
//   imports:[
//     CommonModule,
//     RouterModule,
//     FormsModule
//   ],
//   providers:[
//     UserService
//   ],
//   templateUrl:'./department-compalaint.html',
//   styleUrl:'./department-compalaint.css'
// })
// export class DepartmentComplaint implements OnInit {

//   private router=inject(Router);

//   constructor(private userService:UserService){}

//   isCollapsed=false;
//   isLoading=false;

//   departmentUser?:DepartmentUser;

//   filteredComplaints:Complaint[]=[];

//   currentPage=1;
//   pageSize=10;
//   totalPages=1;

//   showModal=false;
//   selectedComplaint:any=null;
//   activeTab='personal';

//   updatedStatus:any='';
//   updatedPriority:any='';
//   updatedDepartment:number|null=null;
//   remark='';

//   statusList:any[]=[];
//   priorityList:any[]=[];
//   departmentList:any[]=[];

//   isUpdating=false;
//   updateSuccess=false;

//   baseUrl='';

//   ngOnInit():void {

//     const userName=localStorage.getItem('userName');

//     if(!userName){
//       this.router.navigate(['/department-login']);
//       return;
//     }

//     this.loadDepartmentDetails(userName);
//   }

//   toggleSidebar():void{
//     this.isCollapsed=!this.isCollapsed;
//   }

//   loadDepartmentDetails(userName:string):void{

//     this.isLoading=true;

//     this.userService.CheckUserTypeDepartment(userName)
//     .subscribe({

//       next:(response:any)=>{

//         if(response?.message==='success' && response.data?.length>0){

//           const department=response.data[0];

//           this.departmentUser=department;

//           this.loadComplaintList(
//             department.userId,
//             department.roleId,
//             department.departmentID
//           );

//           this.getAllDepartment();

//         }
//         else{
//           this.filteredComplaints=[];
//           this.isLoading=false;
//         }

//       },

//       error:(error)=>{
//         console.error('Department API Error',error);
//         this.filteredComplaints=[];
//         this.isLoading=false;
//       }

//     });

//   }

//   loadComplaintList(userId:string,roleId:string,departmentID:number):void{

//     this.userService.GetAllComplaintDetailsbyDepartment(
//       userId,
//       roleId,
//       departmentID
//     )
//     .subscribe({

//       next:(response:any)=>{

//         this.filteredComplaints=response || [];

//         this.calculatePagination();

//         this.isLoading=false;

//       },

//       error:(error)=>{

//         console.error('Complaint API Error',error);

//         this.filteredComplaints=[];

//         this.calculatePagination();

//         this.isLoading=false;

//       }

//     });

//   }

//   get pagedComplaints():Complaint[]{

//     const start=(this.currentPage-1)*this.pageSize;

//     return this.filteredComplaints.slice(
//       start,
//       start+this.pageSize
//     );

//   }

//   calculatePagination():void{

//     this.totalPages=Math.max(
//       1,
//       Math.ceil(this.filteredComplaints.length/this.pageSize)
//     );

//     this.currentPage=1;

//   }

//   totalPagesArray():number[]{

//     return Array.from(
//       {length:this.totalPages},
//       (_,i)=>i+1
//     );

//   }
  

//   getPageEnd():number{

//     return Math.min(
//       this.currentPage*this.pageSize,
//       this.filteredComplaints.length
//     );

//   }

//   goToPage(page:number):void{
//     this.currentPage=page;
//   }

//   prevPage():void{
//     if(this.currentPage>1){
//       this.currentPage--;
//     }
//   }

//   nextPage():void{
//     if(this.currentPage<this.totalPages){
//       this.currentPage++;
//     }
//   }
//   openComplaintDetails(refNo:string):void{

//     this.userService.GetComplaintDetailsById(refNo)
//     .subscribe({

//       next:(response:any)=>{

//         console.log('Complaint Details:',response);

//         this.selectedComplaint=response?.data || response;

//         this.activeTab='personal';

//         this.updatedStatus='';
//         this.updatedPriority='';
//         this.updatedDepartment=null;
//         this.remark='';

//         this.updateSuccess=false;

//         this.showModal=true;

//         this.GetAllStatus();
//         this.GetAllPriority();
//         this.getAllDepartment();

//       },

//       error:(error)=>{

//         console.error(
//           'Complaint Details Error',
//           error
//         );

//       }

//     });

//   }


//   closeModal():void{

//     this.showModal=false;

//     this.selectedComplaint=null;

//   }


//   GetAllStatus():void{

//     this.userService.GetAllStatus()
//     .subscribe({

//       next:(res:any)=>{

//         this.statusList=res || [];

//       },

//       error:(err)=>{

//         console.error(
//           'Status Error',
//           err
//         );

//       }

//     });

//   }


//   GetAllPriority():void{

//     this.userService.GetAllPriority()
//     .subscribe({

//       next:(res:any)=>{

//         this.priorityList=res || [];

//       },

//       error:(err)=>{

//         console.error(
//           'Priority Error',
//           err
//         );

//       }

//     });

//   }


//   getAllDepartment():void{

//     this.userService.GetAllDepartment()
//     .subscribe({

//       next:(res:any)=>{

//         this.departmentList=res || [];

//       },

//       error:(err)=>{

//         console.error(
//           'Department Error',
//           err
//         );

//       }

//     });

//   }


  


//   updateComplaint():void{

//     if(!this.selectedComplaint){
//       return;
//     }

//     if(!this.updatedStatus || !this.updatedPriority){
//       return;
//     }

//     this.isUpdating=true;

//     this.updateSuccess=false;


//     const payload={

//       CP_RefNo:this.selectedComplaint.cP_RefNo,

//       Status_id:Number(this.updatedStatus),

//       Priority_id:Number(this.updatedPriority),

//       departmentID:this.updatedDepartment
//       ? Number(this.updatedDepartment)
//       : null,

//       Remarks:this.remark

//     };


//     this.userService.UpdateStatusAndPriority(payload)
//     .subscribe({

//       next:(response:any)=>{

//         this.isUpdating=false;

//         this.updateSuccess=true;


//         const status=this.statusList.find(
//           x=>x.status_id==this.updatedStatus
//         );

//         const priority=this.priorityList.find(
//           x=>x.priority_id==this.updatedPriority
//         );


//         if(status){

//           this.selectedComplaint.cP_Status=
//           status.status_Name;

//         }


//         if(priority){

//           this.selectedComplaint.cP_Priority=
//           priority.priority_Name;

//         }


//       },

//       error:(error)=>{

//         console.error(
//           'Update Error',
//           error
//         );

//         this.isUpdating=false;

//       }

//     });

//   }


//   getImageUrl(path:string):string{

//     if(!path){
//       return '';
//     }

//     return this.baseUrl + path;

//   }


//   isPdf(path:string):boolean{

//     return path?.toLowerCase().endsWith('.pdf');

//   }


//   onImgError(event:any):void{

//     event.target.style.display='none';

//   }


//   logout():void{

//     localStorage.clear();

//     this.router.navigate([
//       '/department-login'
//     ]);

//   }

// }


import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../shared/user.service';

export interface DepartmentUser {
  departmentID:number;
  departmentName:string;
  userId:string;
  roleId:string;
  dpMobile:string;
  firstName:string;
  lastName:string;
  userName:string;
  email:string;
}

export interface Complaint {
  cP_RefNo:string;
  cP_Name:string;
  cP_CatId?:number;
  categoryName?:string;
  cP_Priority:string;
  cP_Status:string;
  cP_CreatedAt:string;
  det_IncDate?:string;
}

@Component({
  selector:'department-complaint',
  standalone:true,
  imports:[
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers:[
    UserService
  ],
  templateUrl:'./department-compalaint.html',
  styleUrl:'./department-compalaint.css'
})
export class DepartmentComplaint implements OnInit {

  private router=inject(Router);

  constructor(private userService:UserService){}


  isCollapsed=false;
  isLoading=false;


  departmentUser?:DepartmentUser;


  filteredComplaints:Complaint[]=[];


  currentPage=1;
  pageSize=10;
  totalPages=1;


  showModal=false;
  selectedComplaint:any=null;
  activeTab='personal';


  updatedStatus:any='';
  updatedPriority:any='';
  updatedDepartment:number|null=null;
  remark='';


  statusList:any[]=[];
  priorityList:any[]=[];
  departmentList:any[]=[];


  isUpdating=false;
  updateSuccess=false;


  baseUrl='';



  ngOnInit():void{

    const userName=localStorage.getItem('userName');

    if(!userName){

      this.router.navigate([
        '/department-login'
      ]);

      return;
    }


    this.loadDepartmentDetails(userName);

  }



  toggleSidebar():void{

    this.isCollapsed=!this.isCollapsed;

  }



  loadDepartmentDetails(userName:string):void{

    this.isLoading=true;


    this.userService
    .CheckUserTypeDepartment(userName)
    .subscribe({

      next:(response:any)=>{


        if(response?.message==='success'
        && response.data?.length>0){


          const department=response.data[0];


          this.departmentUser=department;


          this.loadComplaintList(
            department.userId,
            department.roleId,
            department.departmentID
          );


          this.getAllDepartment();


        }
        else{

          this.filteredComplaints=[];

          this.isLoading=false;

        }

      },


      error:(error)=>{

        console.error(
          'Department API Error',
          error
        );

        this.filteredComplaints=[];

        this.isLoading=false;

      }


    });

  }



  loadComplaintList(
    userId:string,
    roleId:string,
    departmentID:number
  ):void{


    this.userService
    .GetAllComplaintDetailsbyDepartment(
      userId,
      roleId,
      departmentID
    )
    .subscribe({

      next:(response:any)=>{


        this.filteredComplaints=response || [];


        this.calculatePagination();


        this.isLoading=false;


      },


      error:(error)=>{


        console.error(
          'Complaint API Error',
          error
        );


        this.filteredComplaints=[];


        this.calculatePagination();


        this.isLoading=false;


      }


    });


  }




  get pagedComplaints():Complaint[]{


    const start=
    (this.currentPage-1)*this.pageSize;


    return this.filteredComplaints.slice(
      start,
      start+this.pageSize
    );

  }




  calculatePagination():void{


    this.totalPages=Math.max(
      1,
      Math.ceil(
        this.filteredComplaints.length/
        this.pageSize
      )
    );


    this.currentPage=1;


  }



  totalPagesArray():number[]{


    return Array.from(
      {
        length:this.totalPages
      },
      (_,i)=>i+1
    );


  }




  getPageEnd():number{


    return Math.min(
      this.currentPage*this.pageSize,
      this.filteredComplaints.length
    );


  }



  goToPage(page:number):void{

    this.currentPage=page;

  }



  prevPage():void{

    if(this.currentPage>1){

      this.currentPage--;

    }

  }



  nextPage():void{

    if(this.currentPage<this.totalPages){

      this.currentPage++;

    }

  }




  openComplaintDetails(refNo:string):void{


    console.log(
      'Clicked Ref No:',
      refNo
    );


    this.userService
    .GetComplaintDetailsById(refNo)
    .subscribe({

      next:(response:any)=>{


        console.log(
          'Complaint Details:',
          response
        );


        this.selectedComplaint=
        response?.data || response;



        this.activeTab='personal';


        this.updatedStatus='';
        this.updatedPriority='';
        this.updatedDepartment=null;
        this.remark='';


        this.updateSuccess=false;


        this.showModal=true;



        this.GetAllStatus();

        this.GetAllPriority();

        this.getAllDepartment();


      },


      error:(error)=>{


        console.error(
          'Complaint Details Error',
          error
        );


      }


    });


  }





  closeModal():void{

    this.showModal=false;

    this.selectedComplaint=null;

  }





  GetAllStatus():void{


    this.userService
    .GetAllStatus()
    .subscribe({

      next:(res:any)=>{

        this.statusList=res || [];

      },


      error:(err)=>{

        console.error(
          'Status Error',
          err
        );

      }


    });


  }





  GetAllPriority():void{


    this.userService
    .GetAllPriority()
    .subscribe({

      next:(res:any)=>{

        this.priorityList=res || [];

      },


      error:(err)=>{

        console.error(
          'Priority Error',
          err
        );

      }


    });


  }





  getAllDepartment():void{


    this.userService
    .GetAllDepartment()
    .subscribe({

      next:(res:any)=>{


        this.departmentList=res || [];


      },


      error:(err)=>{


        console.error(
          'Department Error',
          err
        );


      }


    });


  }





  updateComplaint():void{


    if(!this.selectedComplaint){

      return;

    }


    if(!this.updatedStatus ||
       !this.updatedPriority){

      return;

    }



    this.isUpdating=true;

    this.updateSuccess=false;



    const payload={


      CP_RefNo:
      this.selectedComplaint.cP_RefNo,


      Status_id:
      Number(this.updatedStatus),


      Priority_id:
      Number(this.updatedPriority),


      departmentID:
      this.updatedDepartment
      ? Number(this.updatedDepartment)
      : null,


      Remarks:this.remark


    };




    this.userService
    .UpdateStatusAndPriority(payload)
    .subscribe({


      next:(response:any)=>{


        this.isUpdating=false;


        this.updateSuccess=true;



        const status=
        this.statusList.find(
          x=>x.status_id==this.updatedStatus
        );



        const priority=
        this.priorityList.find(
          x=>x.priority_id==this.updatedPriority
        );



        if(status){

          this.selectedComplaint.cP_Status=
          status.status_Name;

        }



        if(priority){

          this.selectedComplaint.cP_Priority=
          priority.priority_Name;

        }


      },



      error:(error)=>{


        console.error(
          'Update Error',
          error
        );


        this.isUpdating=false;


      }


    });


  }




  getImageUrl(path:string):string{


    if(!path){

      return '';

    }


    return this.baseUrl + path;


  }




  isPdf(path:string):boolean{


    return path?.toLowerCase()
    .endsWith('.pdf');


  }




  onImgError(event:any):void{


    event.target.style.display='none';


  }




  logout():void{


    localStorage.clear();


    this.router.navigate([
      '/department-login'
    ]);


  }


}