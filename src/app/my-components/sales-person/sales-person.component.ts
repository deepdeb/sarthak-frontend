import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/my-services/common.service';

@Component({
  selector: 'app-sales-person',
  templateUrl: './sales-person.component.html',
  styleUrls: ['./sales-person.component.css']
})
export class SalesPersonComponent implements OnInit {
  hide: boolean = true;
  salesPersonList: any = [];
  isDisabled: boolean = false;
  total_count: number = 0;
  isListing: boolean = true;
  sbu_id: any = localStorage.getItem('sbu_id');
  SBUList: any = [];
  salesPersonName: any;
  functionId: any;
  functionList: any = [];
  designationId: any;
  designationList: any = [];
  passWord: any;
  DOB: any;
  emailId: any;
  mobNum: any;

  isEdit: boolean = false;
  salesPersonId: any = localStorage.getItem('sales_person_id');
  checkDesignationId: any = localStorage.getItem('designation_id');
  isMentorVisible: boolean = false;
  mentorList: any = [];
  // mentorId: any = ''; 

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }

  ngOnInit(): void {
    this.getSalesPersonList();
    this.getSBUList();
    this.getFunctionList();
    this.getDesignationList();
    if (this.checkDesignationId == 4) {
      this.getSalespersonById(this.salesPersonId);
    }
  }


  // ************* get SBU List start **************//
  getSBUList() {
    const data = {
      sbu_id: this.sbu_id
    }
    this.rest.getSBUList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.SBUList = [];
            this.SBUList = res.response;
          }
        }
      }
    })
  }
  // ************* get SBU List end **************//




  //*************** get function list start ************//  
  getFunctionList() {
    this.rest.getFunctionList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.functionList = [];
            this.functionList = res.response;
          }
        }
      }
    })
  }
  //*************** get function list end ************//  




  //************ get Designation list start ************//
  getDesignationList() {
    this.rest.getDesignationList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.designationList = [];
            this.designationList = res.response;
          }
        }
      }
    })
  }
  //************ get Designation list end ************//




  //********* FOR total sales person list start *********//
  getSalesPersonList() {
    const data = {
      check_designation_id: this.checkDesignationId,
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id')
    };
    this.rest.getSalesPersonList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.salesPersonList = [];
          this.salesPersonList = res.response;
          this.total_count = res.total_count;
        }
      }
    })
  }
  //********* FOR total sales person list end *********//




  //********* FOR sales person creation start *********//
  createSalesPerson(form: NgForm) {
    // if (!form.value.sbu) {
    //   this.common.showAlertMessage('Select SBU', this.common.errContent)
    //   return
    // }
    if (!this.sbu_id) {
      this.common.showAlertMessage('Select SBU', this.common.errContent)
    }
    // if (!form.value.function) {
    //   this.common.showAlertMessage('Select function', this.common.errContent)
    //   return
    // }
    if (!this.functionId) {
      this.common.showAlertMessage('Select function', this.common.errContent)
    }
    if (!form.value.name) {
      this.common.showAlertMessage('Enter Name', this.common.errContent)
      return
    }
    if (!form.value.designation) {
      this.common.showAlertMessage('Select designation', this.common.errContent)
      return
    }
    if (!form.value.mobile_no) {
      this.common.showAlertMessage('Enter mobile no.', this.common.errContent)
      return
    }
    if (!form.value.email_id.includes('@')) {
      this.common.showAlertMessage('Enter valid email ID', this.common.errContent)
      return
    }
    if (!form.value.password) {
      this.common.showAlertMessage('Enter password', this.common.errContent)
      return
    }
    // const mentorId = form.value.mentor ? form.value.mentor : null

    const data = {
      sbu_id: this.sbu_id,
      function_id: this.functionId,
      sales_person_name: form.value.name,
      designation_id: form.value.designation,
      // mentor_id: mentorId,
      mobile: form.value.mobile_no,
      email: form.value.email_id,
      dob: form.value.dob,
      password: form.value.password,
      ...(this.isEdit && { sales_person_id: this.salesPersonId })
    };
    this.isDisabled = true;
    this.rest.createSalesPerson_rest(data, this.isEdit).subscribe((res: any) => {
      if (res.success) {
        form.reset();
        if (this.checkDesignationId == 4) {
          this.getSalespersonById(this.salesPersonId);
        }
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.isDisabled = false;
        this.getSalesPersonList();
        if (this.checkDesignationId == 1) {
          this.isEdit = false;
        }
      }
    })
  }
  //********* FOR sales person creation start *********//




  //*********** phone number validation start *********//
  restrictPhone(event: any): void {
    if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 9 && event.which !== 46) {
      event.preventDefault();
      return;
    }
  }
  //*********** phone number validation end *********//




  //********** edit & show details for only one sales-person start **********//
  getSalespersonById(sales_person_id: any) {
    this.salesPersonId = sales_person_id;
    this.isEdit = true;
    this.isDisabled = false;
    const data = {
      sales_person_id: this.salesPersonId
    }
    this.rest.getSalespersonById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.sbu_id = res.response.sbu_id;
          // this.getMentorList();
          this.functionId = res.response.function_id;
          // this.mentorId = res.response.mentor_id ? res.response.mentor_id : '';
          this.salesPersonName = res.response.sales_person_name
          this.designationId = res.response.designation_id
          this.emailId = res.response.email
          this.DOB = res.response.dob
          this.mobNum = res.response.mobile
          this.passWord = res.response.password
        }
      }
    })
  }
  //********** edit & show details for only one sales-persson end **********//



  //********* for view details page start *********//
  goToDetailsPage(sales_person_id: any) {
    this.router.navigate(['detailsPage'], { queryParams: { view: 'salesperson', id: sales_person_id } })
  }
  //********* for view details page end *********//



  //********** For get mentor List **********//
  // getMentorList() {
  //   const data = {
  //     sbu_id: this.sbu_id,
  //   }
  //   this.rest.getMentorList_rest(data).subscribe((res: any) => {
  //     if (res.success) {
  //       this.mentorList = [];
  //       if (res.response) {
  //         if (res.response.length > 0) {
  //           this.mentorList = res.response;
  //         }
  //       }
  //     }
  //   })
  // }
  // showMentorList(){
  //   if(this.designationId == 4){
  //     this.isMentorVisible = true;
  //   }
  // }
}
