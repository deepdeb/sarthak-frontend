import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent {

  sbuId: any = localStorage.getItem('sbu_id');
  SBUList: any = [];
  companyName: string = '';
  contactPerson: string = '';
  mobNo: any;  
  emailId: string = '';  
  addreSS: string = '';
  cityName: string = '';
  stateId = '' as any;
  stateList: any = [];
  pinNo: any;
  isEdit: boolean = false;

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }


  ngOnInit(): void {
    if (this.isEdit == false) {
      this.onPageLoadCommonAPI();
    }
  }

  onPageLoadCommonAPI() {
    this.getStateList();
    this.getSBUList();
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

  // phone number validation //
  restrictPhone(event: any): void {
    if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 9 && event.which !== 46) {
      event.preventDefault();
      return;
    }
  }

  //************** create Company function start **************//
  createCompany(){
    if(!this.companyName){
      this.common.showAlertMessage('Please enter Company Name', this.common.errContent)
      return;
    }
    if(!this.contactPerson){
      this.common.showAlertMessage('Please enter Contact Person', this.common.errContent)
      return;
    }
    if(!this.mobNo){
      this.common.showAlertMessage('Please enter Contact No.', this.common.errContent)
      return;
    }
    if(!this.emailId){
      this.common.showAlertMessage('Please enter Email Id', this.common.errContent)
      return;
    }
    if(!this.addreSS){
      this.common.showAlertMessage('Please enter Address', this.common.errContent)
      return;
    }
    if(!this.cityName){
      this.common.showAlertMessage('Please enter City', this.common.errContent)
      return;
    }
    if(!this.stateId){
      this.common.showAlertMessage('Please choose your State', this.common.errContent)
      return;
    }
    if(!this.pinNo){
      this.common.showAlertMessage('Please enter PIN No', this.common.errContent)
      return;
    }
    const data = {
      sbu_name: this.companyName,
      contact_person: this.contactPerson,
      contact_number: this.mobNo,
      email: this.emailId,
      address: this.addreSS,
      city: this.cityName,
      state_id: this.stateId,
      pin: this.pinNo,
    }
    this.rest.createCompany_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.companyName ='';
        this.contactPerson = '';
        this.mobNo = '';
        this.emailId = '';
        this.addreSS = '';
        this.cityName = '';
        this.stateId = '';
        this.pinNo = '';
      }
    })
  }
  //************** create Company function end **************//


}
