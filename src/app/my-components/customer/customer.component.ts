import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
// import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent {

  totalCount: number = 0;
  customerCreateDate: any;
  salesPersonList: any = [];
  total_count: number = 0;
  salesPersonId = '' as any;
  customer_name: string = '';
  mentor_name: string = '';
  contact_name: string = '';
  designation: string = '';
  department: string = '';
  mob_no: any;
  emailId: string = '';
  street_no: string = '';
  street_name: string = '';
  area_name: string = '';
  location_name: string = '';
  district_name: string = '';
  city_name: string = '';
  stateId = '' as any;
  pin_no: any;
  stateList: any = [];
  prdtCategoryId: any;
  prdtCategoryList: any = [];
  customerList: any = [];
  SBUList: any = [];
  sbuId: any = localStorage.getItem('sbu_id');
  isEdit: boolean = false;
  customerId: any;
  checkDesignationId: any = localStorage.getItem('designation_id');
  mentorId: any = '';
  mentorList: any = [];

  segmentId = 0 as number;
  segmentId_1 = 0 as number;
  segmentId_2 = 0 as number;
  segmentId_3 = 0 as number;
  subSegmentId = 0 as number;
  subSegmentId_1 = 0 as number;
  subSegmentId_2 = 0 as number;
  subSubSegmentId = 0 as number;
  subSubSegmentId_1 = 0 as number;
  subSubSubSegmentId = 0 as number;

  segmentList: any = [];
  subSegmentList: any = [];
  subSubSegmentList: any = [];
  subSubSubSegmentList: any = [];
  totalCustomerCount: number = 0;

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }

  ngOnInit(): void {
    if (this.isEdit == false) {
      this.onPageLoadCommonAPI();
    }
  }

  //********** Common API calls on page load **************//
  onPageLoadCommonAPI() {
    this.getSBUList();
    // this.getMentorList();
    // this.getSalesPersonList();
    this.getCustomerList();
    this.getSegmentList();
    this.getStateList();
    this.getPrdtCategoryList();
  }

  //********** For get sales person List **********//
  getSalesPersonList() {
    const data = {
      check_designation_id: this.checkDesignationId,
      sbu_id: this.sbuId,
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


  //********** For get mentor List **********//
  getMentorList() {
    const data = {
      sbu_id: this.sbuId,
    }
    this.rest.getMentorList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.mentorList = [];
            this.mentorList = res.response;
          }
        }
      }
    })
  }

  getMentorSalesList() {
    this.getMentorList()
    this.getSalesPersonList();
  }


  //********** For create Customer List **********//
  createCustomer() {
    if (!this.salesPersonId) {
      this.common.showAlertMessage('Please Choose a sales incharge', this.common.errContent)
      return;
    }
    // if (!this.mentorId) {
    //   this.common.showAlertMessage('Please select mentor', this.common.errContent);
    //   return;
    // }
    if (!this.customer_name) {
      this.common.showAlertMessage('Please enter customer name', this.common.errContent)
      return;
    }
    if (!this.segmentId) {
      this.common.showAlertMessage('Please Choose a segment', this.common.errContent)
      return;
    }
    if (!this.contact_name) {
      this.common.showAlertMessage('Please enter contact person name', this.common.errContent)
      return;
    }
    if (!this.designation) {
      this.common.showAlertMessage('Please enter designation', this.common.errContent)
      return;
    }
    if (!this.department) {
      this.common.showAlertMessage('Please Enter a department', this.common.errContent);
      return;
    }
    if (!this.mob_no) {
      this.common.showAlertMessage('Please enter mobile no.', this.common.errContent)
      return;
    }
    if (!this.emailId) {
      this.common.showAlertMessage('Please enter a email id', this.common.errContent)
      return;
    }
    if (!this.prdtCategoryId) {
      this.common.showAlertMessage('Please choose a product category', this.common.errContent);
      return;
    }
    if (!this.street_no) {
      this.common.showAlertMessage('Please enter street no.', this.common.errContent)
      return;
    }
    if (!this.street_name) {
      this.common.showAlertMessage('Please enter street name', this.common.errContent)
      return;
    }
    if (!this.area_name) {
      this.common.showAlertMessage('Please Enter area name', this.common.errContent);
      return;
    }
    if (!this.location_name) {
      this.common.showAlertMessage('Please enter location name', this.common.errContent)
      return;
    }
    if (!this.district_name) {
      this.common.showAlertMessage('Please enter district', this.common.errContent)
      return;
    }
    if (!this.city_name) {
      this.common.showAlertMessage('Please enter city', this.common.errContent);
      return;
    }
    if (!this.stateId) {
      this.common.showAlertMessage('Please select state', this.common.errContent);
      return;
    }
    if (!this.pin_no) {
      this.common.showAlertMessage('Please enter pin', this.common.errContent);
      return;
    }

    const data = {
      sbu_id: this.sbuId,
      sales_person_id: this.salesPersonId,
      // mentor_id: this.mentorId,
      customer: this.customer_name,
      segment_id: this.segmentId,
      subsegment_id: this.subSegmentId,
      subsubsegment_id: this.subSubSegmentId,
      subsubsubsegment_id: this.subSubSubSegmentId,
      name: this.contact_name,
      designation: this.designation,
      department: this.department,
      mobile: this.mob_no,
      email: this.emailId,
      product_category_id: this.prdtCategoryId,
      street_no: this.street_no,
      street_name: this.street_name,
      area: this.area_name,
      location: this.location_name,
      district: this.district_name,
      city: this.city_name,
      state_id: this.stateId,
      pin: this.pin_no,
      ...(this.isEdit && { customer_id: this.customerId })
    }

    this.rest.createCustomer_rest(data, this.isEdit).subscribe((res: any) => {
      if (res.success) {
          this.sbuId = '';
          this.salesPersonId = ''
          // this.mentorId = ''
          this.customer_name = ''
          this.segmentId = 0
          this.subSegmentId = 0
          this.subSubSegmentId = 0
          this.subSubSubSegmentId = 0
          this.contact_name = ''
          this.designation = ''
          this.department = ''
          this.mob_no = ''
          this.emailId = ''
          this.prdtCategoryId = ''
          this.street_no = ''
          this.street_name = ''
          this.area_name = ''
          this.location_name = ''
          this.district_name = ''
          this.city_name = ''
          this.stateId = 0
          this.pin_no = ''
          this.common.showAlertMessage(res.message, this.common.succContent);
          this.getCustomerList();
      }
    })

  }


  //********** For get Customer List **********//

  getCustomerList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id')
    };
    this.rest.getCustomerList_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.customerList = [];
        if (res.response) {
          if (res.response.length > 0) {
            this.customerList = res.response;
            this.totalCustomerCount = res.total_count;
            console.log('>>>customer list', this.customerList)
          }
        }
      }
    })
  }


  //************  segment listing function start ***********//
  getSegmentList() {
    this.segmentList = [];
    this.rest.getSegmentList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.segmentList = res.response;
            // this.totalCount = res.total_count;
          }
        }
      }
    })
  }

  //************  segment listing function end ***********//



  //************  sub-segment listing function end ***********//

  getSubSegmentList() {
    this.subSegmentList = [];
    this.subSegmentId = 0;
    this.subSegmentId_1 = 0;
    this.subSegmentId_2 = 0;
    this.subSubSegmentId = 0;
    this.subSubSegmentId_1 = 0;
    this.subSubSubSegmentId = 0;
    const data = {
      segment_id: this.segmentId
    }
    this.rest.getSubSegmentList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.subSegmentList = res.response;
          }
        }
      }
    })
  }


  getSubSubSegmentList() {
    this.subSubSegmentList = [];
    this.subSubSegmentId = 0;
    this.subSubSegmentId_1 = 0;
    this.subSubSubSegmentId = 0;
    const data = {
      segment_id: this.segmentId || this.segmentId_1 || this.segmentId_2 || this.segmentId_3,
      subsegment_id: this.subSegmentId || this.subSegmentId_1 || this.subSegmentId_2
    }
    this.rest.getSubSubSegmentList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.subSubSegmentList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }

  getSubSubSubSegmentList() {
    this.subSubSubSegmentList = [];
    this.subSubSubSegmentId = 0
    const data = {
      segment_id: this.segmentId || this.segmentId_1 || this.segmentId_2 || this.segmentId_3,
      subsegment_id: this.subSegmentId || this.subSegmentId_1 || this.subSegmentId_2,
      subsubsegment_id: this.subSubSegmentId || this.subSubSegmentId_1
    }
    this.rest.getSubSubSubSegmentList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.subSubSubSegmentList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }



  //**************** get state list function start ************//
  getStateList() {
    this.rest.getStateList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.stateList = [];
            this.stateList = res.response;
          }
        }
      }
    })
  }
  //**************** get state list function end ************//



  //************* get Product category list start *********//
  getPrdtCategoryList() {
    this.rest.getPrdtCategoryList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.prdtCategoryList = [];
            this.prdtCategoryList = res.response;
          }
        }
      }
    })
  }


  // phone number validation //
  restrictPhone(event: any): void {
    if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 9 && event.which !== 46) {
      event.preventDefault();
      return;
    }
  }

  // ************* get SBU List ************** //
  getSBUList() {
    const data = {
      sbu_id: this.sbuId
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


  //************* for edit customer ***********//
  getCustomerDetailsById(function_customer_id: any) {
    this.mentorList = [];
    this.salesPersonList = [];
    this.customerId = function_customer_id
    this.isEdit = true;
    const data = {
      customer_id: function_customer_id
    }
    this.rest.getCustomerDetailsById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.sbuId = res.response.sbu_id;
          if(this.sbuId) {
            this.getMentorList();
            this.getSalesPersonList();
          }

          this.segmentId = res.response.segment_id
          if(this.segmentId) {
            this.getSubSegmentList();
          }
          this.subSegmentId = res.response.subsegment_id
          if(this.subSegmentId) {
            this.getSubSubSegmentList();
          }
          this.subSubSegmentId = res.response.subsubsegment_id
          if(this.subSubSegmentId) {
            this.getSubSubSubSegmentList();
          }
          this.subSubSubSegmentId = res.response.subsubsubsegment_id
          this.customer_name = res.response.customer
          this.area_name = res.response.area
          this.location_name = res.response.location
          this.customerCreateDate = res.response.date
          this.department = res.response.department;
          this.designation = res.response.designation;
          this.salesPersonId = res.response.sales_person_id;
          this.city_name = res.response.city
          this.pin_no = res.response.pin
          this.mob_no = res.response.mobile
          this.contact_name = res.response.name
          this.mentorId = res.response.mentor_id
          this.emailId = res.response.email
          this.district_name = res.response.district
          this.street_no = res.response.street_no
          this.street_name = res.response.street_name
          this.prdtCategoryId = res.response.product_category_id
          this.stateId = res.response.state_id;
        }
      }
    })
  }



  //************* for all details page ***********//


  //*********** DETAILS view ***********//
  goToDetailsPage(customer_id: any) {
    this.router.navigate(['detailsPage'], { queryParams: { view: 'customer', id: customer_id } });
  }

}
