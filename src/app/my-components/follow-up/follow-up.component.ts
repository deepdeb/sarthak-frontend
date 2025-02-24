import { Component } from '@angular/core';
import { RestService } from 'src/app/my-services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent {
  enquiryId: any;
  salesPersonName: any;
  reffNumber: any;
  customerName: any;
  enquirySource: any;
  principalHouse: any;
  offerDate: any;
  basicValue: any;
  tentativeFinalizationMonth: any;
  statusInitial: any;
  enquiryDate: any;
  tentativeFinalizationYear: any;
  remarksInitial: any;
  supportInitial: any;

  followUpDateCreate: any;
  followUpStatusCreate: string = '';
  followUpRemarksCreate: string = '';
  followUpSupportCreate: string = '';
  isCreateNew: boolean =false;
  followUpList: any = [];

  constructor(private route: ActivatedRoute, private rest: RestService, private common: CommonService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.enquiryId = params['enquiry_id'];
    })
    this.getEnquiryById();
    this.getFollowUpById();
  }
  
  getEnquiryById() {
    const data = {
      enquiry_id: this.enquiryId,
      sbu_id: sessionStorage.getItem('sbu_id')
    }
    this.rest.getEnquiryById_rest(data).subscribe((res: any) => {
      if(res.success) {
        if(res.response) {
          this.salesPersonName = res.response[0].sales_person_name,
          this.reffNumber = res.response[0].reff_number;
          this.customerName = res.response[0].customer,
          this.enquiryDate = res.response[0].enquiry_date,
          this.enquirySource = res.response[0].enquiry_source_name,
          this.principalHouse = res.response[0].principal_house,
          this.offerDate = res.response[0].offer_date,
          this.basicValue = res.response[0].basic_value,
          this.tentativeFinalizationMonth = res.response[0].tentative_finalization_month,
          this.tentativeFinalizationYear = res.response[0].tentative_finalization_year,
          this.statusInitial = res.response[0].status_initial,
          this.remarksInitial = res.response[0].remarks_initial,
          this.supportInitial = res.response[0].support_initial
        }
      }
    })
  }



  //********** follow up creation **********//
  createFollowUp(){
    if(!this.followUpDateCreate){
      this.common.showAlertMessage('Please select Follow Up Date ', this.common.errContent)
      return;
    } 
    if(!this.followUpStatusCreate){
      this.common.showAlertMessage('Please write the Follow Up Status ', this.common.errContent)
      return;
    }
    const data = {
      enquiry_id: this.enquiryId,
      status_date: this.followUpDateCreate,
      status: this.followUpStatusCreate,
      remarks: this.followUpRemarksCreate,
      support: this.followUpSupportCreate
    }
    this.rest.createFollowUp_rest(data).subscribe((res: any) =>{
      if(res.success){
        if(res.response){
          this.common.showAlertMessage(res.response, this.common.succContent)
          this.getFollowUpById();
          this.followUpDateCreate = '',
          this.followUpStatusCreate = '',
          this.followUpRemarksCreate = '',
          this.followUpSupportCreate = ''
          this.isCreateNew = false;
        }
      }
    })
  }


  showNewFollowUpForm(){
    this.isCreateNew = true
  }



  //************* get follow-up *************//
  getFollowUpById(){
    this.followUpList = [];
    const data = {
      enquiry_id: this.enquiryId
    }
    this.rest.getFollowUpById_rest(data).subscribe((res:any) =>{
      if(res.success){
        if(res.response){
          if(res.response.length > 0){
            this.followUpList = res.response;
          }
        }
      }
    })
  }
}
