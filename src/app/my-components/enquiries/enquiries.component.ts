import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent {
  customer_Name: string = '';
  sbuId: any = localStorage.getItem('sbu_id');
  salesPersonList: any = [];
  salesPersonId = '' as any;
  customerList: any = [];
  customerId = '' as any;
  enquiryDate: any;
  enquirySource = '' as string;
  principalHouse: any;
  enquiryTypeId: any = '';
  enquirySubTypeId: any = '';
  basicValue: any;
  offerDate: any;
  yearFinal = '' as any;
  monthFinal = '' as any;
  enquiryStatus: any;
  enquiryRemarks: any;
  enquirySupport: any;
  enquiryTypeList: any = [];
  enquirySubTypeList: any = [];
  enquiryList: any = [];
  enquiryId: any;
  totalCount: number = 0;
  isEdit: boolean = false;

  checkSalesPersonId: any = localStorage.getItem('sales_person_id')
  checkDesignationId: any = localStorage.getItem('designation_id');
  customerBySalespersonList = [] as any;


  // ************ static months & years **************//
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  years = ['2024', '2025'];



  constructor(private router: Router, private common: CommonService, private rest: RestService) { }

  ngOnInit(): void {
    this.getSalesPersonList();
    this.getCustomerList();
    this.getEnquiryTypeList();
    this.getEnquirySubTypeList();
    this.getEnquiryList();
  }


  //********** For get Customer List **********//
  getCustomerList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      // sales_person_id: localStorage.getItem('sales_person_id')
      sales_person_id: this.salesPersonId
    };
    this.rest.getCustomerList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.customerList = [];
            this.customerList = res.response;
            // this.totalCount = res.total_count;
          }
        }
      }
    })
  }


  //********* FOR get customer list by salesperson start *********//
  getCustomerListBySalesperson() {
    this.customerBySalespersonList = []
    this.customerId = ''
    this.setSBUId(this.salesPersonId);
    const data = {
      sales_person_id: this.salesPersonId
    }
    this.rest.getCustomerListBySalesperson_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.customerBySalespersonList = res.response;
          }
        }
      }
    })
  }
  //********* FOR get customer list by salesperson end **********/




  //********* Set SBU ID for create enquiry ************/
  setSBUId(sales_person_id: any) {
    console.log(sales_person_id);
    console.log(this.salesPersonList);
    
    const salesperson = this.salesPersonList.find((element: any) => element.sales_person_id == sales_person_id);
    this.sbuId = salesperson.sbu_id;
  }
  //********* Set SBU ID for create enquiry ************/




  //********* FOR total sales person list start *********//
  getSalesPersonList() {
    const data = {
      // check_designation_id: this.checkDesignationId,
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id')
    };
    this.rest.getSalesPersonList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.salesPersonList = [];
          this.salesPersonList = res.response;
        }
      }
    })
  }
  //********* FOR total sales person list end *********//



  //*********** get enquiry type list start *********//
  getEnquiryTypeList() {
    this.rest.getEnquiryTypeList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquiryTypeList = [];
            this.enquiryTypeList = res.response;
          }
        }
      }
    })
  }



  //*********** get enquiry sub type list start *********//
  getEnquirySubTypeList() {
    this.rest.getEnquirySubTypeList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquirySubTypeList = [];
            this.enquirySubTypeList = res.response;
          }
        }
      }
    })
  }


  //************* Create Enquiry start *************//
  createEnquiry() {
    if (!this.salesPersonId) {
      this.common.showAlertMessage('Please choose Sales Person', this.common.errContent);
      return;
    }
    if (!this.customerId) {
      this.common.showAlertMessage('Please choose customer', this.common.errContent);
      return;
    }
    if (!this.enquiryDate) {
      this.common.showAlertMessage('Please set Enquiry Date', this.common.errContent);
      return;
    }
    if (!this.enquirySource) {
      this.common.showAlertMessage('Plese enter source of enquiry', this.common.errContent)
      return;
    }
    if (!this.enquiryTypeId) {
      this.common.showAlertMessage('Please choose type of enquiry', this.common.errContent);
      return;
    }
    if (!this.enquirySubTypeId) {
      this.common.showAlertMessage('Please choose enquiry sub type', this.common.errContent);
      return;
    }
    if (!this.principalHouse) {
      this.common.showAlertMessage('Please enter Principal House', this.common.errContent);
      return;
    }

    const data = {
      sbu_id: this.sbuId,
      sales_person_id: this.salesPersonId,
      customer_id: this.customerId,
      enquiry_date: this.enquiryDate,
      enquiry_source: this.enquirySource,
      enquiry_type_id: this.enquiryTypeId,
      enquiry_sub_type_id: this.enquirySubTypeId,
      principal_house: this.principalHouse,
      offer_date: this.offerDate,
      basic_value: this.basicValue,
      tentative_finalization_month: this.monthFinal,
      tentative_finalization_year: this.yearFinal,
      status_initial: this.enquiryStatus,
      remarks_initial: this.enquiryRemarks,
      support_initial: this.enquirySupport,
      ...(this.isEdit && { enquiry_id: this.enquiryId }),
    }
    this.rest.createEnquiry_rest(data, this.isEdit).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.salesPersonId = ''
          this.customerId = ''
          this.enquiryDate = ''
          this.enquirySource = ''
          this.enquiryTypeId = ''
          this.enquirySubTypeId = ''
          this.principalHouse = ''
          this.offerDate = ''
          this.basicValue = ''
          this.monthFinal = ''
          this.yearFinal = ''
          this.enquiryStatus = ''
          this.enquiryRemarks = ''
          this.enquirySupport = ''
          this.common.showAlertMessage(res.message, this.common.succContent)
          this.getEnquiryList();
          this.isEdit = false;
        }
      }
    })

  }


  //********** get enquiry listing start **********//
  getEnquiryList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id')
    }
    this.rest.getEnquiryList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquiryList = [];
            this.enquiryList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }





  //*********** DETAILS view ***********//
  goToDetailsPage(enquiry_id: any) {
    this.router.navigate(['detailsPage'], { queryParams: { view: 'enquiry', id: enquiry_id } })
  }


  getEnquiryById(enquiry_id: any) {
    this.enquiryId = enquiry_id;
    this.isEdit = true;
    const data = {
      sbu_id: this.sbuId,
      enquiry_id: enquiry_id
    }
    this.rest.getEnquiryById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.salesPersonId = res.response[0].sales_person_id
          if (this.salesPersonId) {
            this.getCustomerListBySalesperson();
            this.setSBUId(this.salesPersonId);
          }
          this.customerId = res.response[0].customer_id
          this.enquiryDate = res.response[0].enquiry_date
          this.enquirySource = res.response[0].enquiry_source
          this.principalHouse = res.response[0].principal_house
          this.enquiryTypeId = res.response[0].enquiry_type_id
          this.enquirySubTypeId = res.response[0].enquiry_sub_type_id
          this.basicValue = res.response[0].basic_value
          this.offerDate = res.response[0].offer_date
          this.yearFinal = res.response[0].tentative_finalization_year
          this.monthFinal = res.response[0].tentative_finalization_month
          this.enquiryStatus = res.response[0].status_initial
          this.enquiryRemarks = res.response[0].remarks_initial
          this.enquirySupport = res.response[0].support_initial
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




  //************* for follow-up page ***************//
  goToFollowUpPage(enquiry_id: any) {
    this.router.navigate(['followUp'], { queryParams: { enquiry_id: enquiry_id } });
  }

  console() {
    console.log(this.yearFinal);
  }

}


