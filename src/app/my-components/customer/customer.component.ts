import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent {

  customerCreateDate: any = new Date().toISOString().split('T')[0];
  salesPersonList: any = [];
  salesPersonId = localStorage.getItem('sales_person_id');
  checkSalesPersonId = localStorage.getItem('sales_person_id') as any;
  customer_name: string = '';
  mentor_name: string = '';
  contact_name: string = '';
  designation: string = '';
  department: string = '';
  mob_no: any;
  alt_mob_no: any;
  emailId: string = '';
  alt_emailId: string = '';
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
  isButtonDisabled: boolean = false;
  customerId: any;
  checkDesignationId: any = localStorage.getItem('designation_id');
  checkSbuId: any = localStorage.getItem('sbu_id')
  // mentorId: any = '';
  mentorList: any = [];
  isHideInput: boolean = true;
  isOthersChecked: boolean = false;
  otherProductCategory: string = ''

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

  filterByKeyword: string = '';
  filteredListByCategory: any = [];
  customersByFilter: string = '';
  selectedCategoryIds: any = [];
  searchCriteria : string = '';

  customerOffset : number =  0;

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


  previousList(){
    this.customerOffset = this.customerOffset > 0 ? this.customerOffset - 10 : 0;
    this.getCustomerList();
  }
  nextList(){
    this.customerOffset =  this.customerOffset + 10 ;
    this.getCustomerList();
  }

  //********** For get sales person List **********//
  getSalesPersonList() {
    this.salesPersonList = [];
    this.salesPersonId = ''
    const data = {
      check_designation_id: this.checkDesignationId,
      sbu_id: this.sbuId,
      sales_person_id: localStorage.getItem('sales_person_id')
    };
    this.rest.getSalesPersonList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.salesPersonList = res.response;
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
    // this.getMentorList()
    this.getSalesPersonList();
  }


  //********** For create Customer List **********//
  createCustomer() {
    if (!this.salesPersonId) {
      this.common.showAlertMessage('Please Choose a sales incharge', this.common.errContent)
      return;
    }
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
    if(this.selectedCategoryIds.includes(4)) {
      if(!this.otherProductCategory) {
        this.common.showAlertMessage('Please enter product category', this.common.errContent)
        return;
      }
    }

    const selectedCategoryIds = this.selectedCategoryIds.join(',');

    const data = {
      sbu_id: this.sbuId,
      sales_person_id: this.salesPersonId,
      customer_create_date: this.customerCreateDate,
      customer: this.customer_name,
      segment_id: this.segmentId,
      subsegment_id: this.subSegmentId,
      subsubsegment_id: this.subSubSegmentId,
      subsubsubsegment_id: this.subSubSubSegmentId,
      name: this.contact_name,
      designation: this.designation,
      department: this.department,
      mobile: this.mob_no,
      alt_mobile: this.alt_mob_no,
      email: this.emailId,
      alt_email: this.alt_emailId,
      product_category_id: selectedCategoryIds,
      other_product_category: this.isOthersChecked ? this.otherProductCategory : '',
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
    this.isButtonDisabled = true;
    this.rest.createCustomer_rest(data, this.isEdit).subscribe((res: any) => {
      if (res.success) {
        if(this.filterByKeyword && this.customersByFilter){
          this.getFilterListByCategory();
        } else{
          this.getCustomerList();
        }
        this.sbuId = this.checkSbuId != 0 ? this.checkSbuId : '';
        this.salesPersonId = this.checkSbuId != 0 ? this.checkSalesPersonId : '';
        this.customerCreateDate = new Date().toISOString().split('T')[0];
        this.customer_name = ''
        this.segmentId = 0
        this.subSegmentId = 0
        this.subSubSegmentId = 0
        this.subSubSubSegmentId = 0
        this.contact_name = ''
        this.designation = ''
        this.department = ''
        this.mob_no = ''
        this.alt_mob_no = ''
        this.emailId = ''
        this.alt_emailId = ''
        this.prdtCategoryId = ''
        this.otherProductCategory = ''
        this.isOthersChecked = false
        this.street_no = ''
        this.street_name = ''
        this.area_name = ''
        this.location_name = ''
        this.district_name = ''
        this.city_name = ''
        this.stateId = 0
        this.pin_no = ''
        this.selectedCategoryIds = []
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.isButtonDisabled = false;
        this.isEdit = false;
       

      }
    })

  }


  //********** For get Customer List **********//

  getCustomerList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id'),
      search_criteria: this.searchCriteria,
      customer_offset : this.customerOffset
    };
    this.rest.getCustomerList_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.customerList = [];
        if (res.response) {
          if (res.response.length > 0) {
            this.customerList = res.response;
            this.totalCustomerCount = res.total_count;
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.mentorList = [];
    this.salesPersonList = [];
    this.customerId = function_customer_id
    this.isEdit = true;
    this.isHideInput = false;
    this.isButtonDisabled = false;
    const data = {
      customer_id: function_customer_id
    }
    this.rest.getCustomerDetailsById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.sbuId = res.response[0].sbu_id;
          if (this.sbuId) {
            this.getMentorList();
            this.getSalesPersonList();
          }

          this.segmentId = res.response[0].segment_id
          if (this.segmentId) {
            this.getSubSegmentList();
          }
          this.subSegmentId = res.response[0].subsegment_id
          if (this.subSegmentId) {
            this.getSubSubSegmentList();
          }
          this.subSubSegmentId = res.response[0].subsubsegment_id
          if (this.subSubSegmentId) {
            this.getSubSubSubSegmentList();
          }
          this.subSubSubSegmentId = res.response[0].subsubsubsegment_id
          this.customer_name = res.response[0].customer
          this.area_name = res.response[0].area
          this.location_name = res.response[0].location
          this.department = res.response[0].department;
          this.designation = res.response[0].designation;
          this.salesPersonId = res.response[0].sales_person_id;
          this.customerCreateDate = res.response[0].customer_create_date;
          this.city_name = res.response[0].city
          this.pin_no = res.response[0].pin
          this.mob_no = res.response[0].mobile
          this.alt_mob_no = res.response[0].alt_mobile
          this.contact_name = res.response[0].name
          // this.mentorId = res.response[0].mentor_id
          this.emailId = res.response[0].email
          this.alt_emailId = res.response[0].alt_email
          this.district_name = res.response[0].district
          this.street_no = res.response[0].street_no
          this.street_name = res.response[0].street_name
          // this.prdtCategoryId = res.response[0].product_category_id
          this.selectedCategoryIds = res.response[0].product_category_id.split(',').map((id: string) => +id.trim());
          this.otherProductCategory = res.response[0].other_product_category;
          this.stateId = res.response[0].state_id;
        }
      }
    })
  }
  //************* for all details page ***********//


  //*********** DETAILS view ***********//
  goToDetailsPage(customer_id: any) {
    this.router.navigate(['detailsPage'], { queryParams: { view: 'customer', id: customer_id } });
  }


  //********** Filter Customer List By Category **********//
  getFilterListByCategory() {
    this.filteredListByCategory = [];
    const data = {
      filterby_keyword: this.filterByKeyword
    }
    this.rest.getFilterListByCategory_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.filteredListByCategory = res.response;
          }
        }
      }
    })
  }

  getCustomersByFilter() {
    this.customerList = [];
    this.totalCustomerCount = 0;
    const data = {
      filter_by: this.filterByKeyword,
      filter_by_value: this.customersByFilter,
    }
    this.rest.getCustomersByFilter_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.customerList = res.response;
            this.totalCustomerCount = res.total_count;
          }
        }
      }
    })
  }


  //********** Check box logic **********//
  onCheckboxChange(event: any) {
    const categoryId = +event.target.value
    if (event.target.checked) {
      if(event.target.value == 4){
        this.isOthersChecked = true;
        this.isHideInput = false
      }
      this.selectedCategoryIds.push(categoryId)
    } else {
      if(event.target.value == 4) {
        this.isOthersChecked = false;
        this.isHideInput = true
      }
      this.selectedCategoryIds = this.selectedCategoryIds.filter((id: any) => id !== categoryId)
    }
  }


  // **************** new form logic  ********************//
  newForm() {
    window.location.reload()
  }
}
