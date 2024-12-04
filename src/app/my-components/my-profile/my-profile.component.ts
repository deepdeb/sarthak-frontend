import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  salesPersonId: any = localStorage.getItem('sales_person_id');
  salesPersonName: any;
  sbuName: any;
  functionName: any;
  designationName: any;
  sbu_id: any = localStorage.getItem('sbu_id');
  functionId: any;
  designationId: any;
  passWord: any;
  DOB: any;
  emailId: any;
  mobNum: any;


  constructor(private router: Router, private rest: RestService, private common: CommonService) { }

  ngOnInit(): void {
    this.getSalespersonById(this.salesPersonId)
  }



//*********** phone number validation start *********//
restrictPhone(event: any): void {
  if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 9 && event.which !== 46) {
    event.preventDefault();
    return;
  }
}
//*********** phone number validation end *********//

getSalespersonById(sales_person_id: any) {
  this.salesPersonId = sales_person_id;
  const data = {
    sales_person_id: this.salesPersonId
  }
  this.rest.getSalespersonById_rest(data).subscribe((res: any) => {
    if (res.success) {
      if (res.response) {
        this.sbuName = res.response.sbu_name;
        this.functionName = res.response.function_name;
        this.salesPersonName = res.response.sales_person_name
        this.designationName = res.response.sbu_name
        this.emailId = res.response.email
        this.DOB = res.response.dob
        this.mobNum = res.response.mobile
        this.passWord = res.response.password
      }
    }
  })
}




}
