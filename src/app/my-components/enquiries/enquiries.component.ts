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
  salesIncharge: string = '';
  customer_Name: string = '';
  sbuId: any = localStorage.getItem('sbu_id');
  salesPersonList: any = [];
  salesPersonId: any = localStorage.getItem('sales_person_id');
  customerList: any =[];
  customerId: any;
  enquiryDate: any;
  principalHouse: any;
  enquirySourceId: any;
  basicValue: any;
  offerDate: any;
  yearFinal: any;
  monthFinal: any;
  enquiryStatus: any;
  enquiryRemarks: any;
  enquirySupport: any;
  enquirySourceList: any= [];
  enquiryList: any= [];
  enquiryId: any;
  totalCount : number = 0;

  isEdit:  boolean = false;
  checkDesignationId: any = localStorage.getItem('designation_id');



constructor( private router: Router, private common: CommonService, private rest: RestService){}

ngOnInit(): void{
  this.getSalesPersonList();
  this.getCustomerList();
  this.getEnquirySourceList();
  this.getEnquiryList();
}


//********** For get Customer List **********//
getCustomerList(){
  const data = {
    check_designation_id: localStorage.getItem('designation_id'),
    sbu_id: localStorage.getItem('sbu_id'),
    sales_person_id: localStorage.getItem('sales_person_id')
  };
  this.rest.getCustomerList_rest(data).subscribe((res: any) =>{
    if(res.success){
      if(res.response){
        console.log('>>> customer list', res.response)
        if(res.response.length > 0){
          this.customerList = [];
          this.customerList = res.response;
          // this.totalCount = res.total_count;
        }
      }
    }
  })
}


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
        // console.log('>>>', res)
        this.salesPersonList = [];
        this.salesPersonList = res.response;
        // this.total_count = res.total_count;
      }
    }
  })
}
//********* FOR total sales person list end *********//



//*********** get enquiry source list start *********//
getEnquirySourceList(){
  this.rest.getEnquirySourceList_rest().subscribe((res: any) =>{
    if(res.success){
      if(res.response){
        console.log("enquirySourceList", res.response)
        if(res.response.length > 0){
          this.enquirySourceList = [];
          this.enquirySourceList = res.response;
        }
      }
    }
  })
}


//************* Create Enquiry start *************//
createEnquiry(){
  // if(!this.salesPersonId){
  //   this.common.showAlertMessage('Please choose a Sales Person', this.common.errContent);
  //   return;
  // }
  // if(!this.customerId){
  //   this.common.showAlertMessage('Please choose a Customer', this.common.errContent);
  //   return;
  // }
  if(!this.enquiryDate){
    this.common.showAlertMessage('Please set a Enquiry Date', this.common.errContent);
    return;
  }
  if(!this.enquirySourceId){
    this.common.showAlertMessage('Please choose a Enquiry Source', this.common.errContent);
    return;
  }
  if(!this.principalHouse){
    this.common.showAlertMessage('Please enter PrincipalHouse', this.common.errContent);
    return;
  }
  if(!this.offerDate){
    this.common.showAlertMessage('Please set a Offer Date', this.common.errContent);
    return;
  }
  if(!this.basicValue){
    this.common.showAlertMessage('Please enter the Basic Value', this.common.errContent);
    return;
  }
  if(!this.monthFinal){
    this.common.showAlertMessage('Please enter Final Month', this.common.errContent);
    return;
  }
  if(!this.yearFinal){
    this.common.showAlertMessage('Please enter Final Year', this.common.errContent);
    return;
  }
  if(!this.enquiryStatus){
    this.common.showAlertMessage('Please enter Enquiry Status', this.common.errContent);
    return;
  }
  if(!this.enquiryRemarks){
    this.common.showAlertMessage('Please enter Enquiry Remarks', this.common.errContent);
    return;
  }
  if(!this.enquirySupport){
    this.common.showAlertMessage('Please enter Required Support', this.common.errContent);
    return;
  }

  const data ={
    sbu_id: this.sbuId,
    sales_person_id : this.salesPersonId,
    customer_id: this.customerId,
    enquiry_date: this.enquiryDate,
    enquiry_source_id: this.enquirySourceId,
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
  this.rest.createEnquiry_rest(data, this.isEdit).subscribe((res: any) =>{
    if(res.success){
      if(res.response){
        this.salesPersonId = ''
        this.customerId = ''
        this.enquiryDate = ''
        this.enquirySourceId = ''
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

      }
    }
  })

}


//********** get enquiry listing start **********//
getEnquiryList(){
  const data = {
    check_designation_id: localStorage.getItem('designation_id'),
    sbu_id: localStorage.getItem('sbu_id'),
    sales_person_id: localStorage.getItem('sales_person_id')
  }
  console.log('>>>',data)
  this.rest.getEnquiryList_rest(data).subscribe((res: any) =>{
    if(res.success){
      if(res.response){
        console.log("get enq list", res.response)
        if(res.response.length > 0){
          this.enquiryList = [];
          this.enquiryList = res.response;
          this.totalCount = res.total_count;
        }
      }
    }
  })
}





//*********** DETAILS view ***********//
goToDetailsPage(enquiry_id: any){
  this.router.navigate(['detailsPage'], {queryParams: { view: 'enquiry', id: enquiry_id} })
}




getEnquiryById(enquiry_id: any){
  this.enquiryId = enquiry_id;
  this.isEdit = true;
  const data = {
    sbu_id: localStorage.getItem('sbu_id'),
    enquiry_id: enquiry_id
  }
  this.rest.getEnquiryById_rest(data).subscribe((res: any) =>{
    if(res.success){
      if(res.response){
        console.log('res response>>>', res.response)
        // this.enquiryId = res.response.enquiry_id
        this.salesPersonId = res.response.sales_person_id
        this.customerId = res.response.customer_id
        this.enquiryDate = res.response.enquiry_date
        this.principalHouse = res.response.principal_house
        this.enquirySourceId = res.response.enquiry_source_id,
        this.basicValue = res.response.basic_value
        this.offerDate = res.response.offer_date
        this.yearFinal = res.response.tentative_finalization_year
        this.monthFinal = res.response.tentative_finalization_month
        this.enquiryStatus = res.response.status_initial
        this.enquiryRemarks = res.response.remarks_initial
        this.enquirySupport = res.response.support_initial
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

}
