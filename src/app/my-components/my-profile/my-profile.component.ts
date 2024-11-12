import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  salesPersonName: any;
  isEdit: boolean = false;
  sbu_id: any = localStorage.getItem('sbu_id');
  functionId: any;
  hide: boolean = true;
  designationId: any;
  passWord: any;
  DOB: any;
  emailId: any;
  mobNum: any;




//*********** phone number validation start *********//
restrictPhone(event: any): void {
  if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 9 && event.which !== 46) {
    event.preventDefault();
    return;
  }
}
//*********** phone number validation end *********//

}
