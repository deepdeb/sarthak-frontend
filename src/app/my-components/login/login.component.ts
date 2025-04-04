import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {MatSnackBar} from '@angular/material/snack-bar';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';
// import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // private _snackBar = inject(MatSnackBar);

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, { verticalPosition: "top", duration: 4000});
  // }
  hide: boolean = true;
  sbu_id = '' as any;
  userName: any;
  password: any;
  designation_id: string = "";
  sales_person_id: string = "";
  sbu_name: any;
  currentYear = new Date().getFullYear()
  yearArray = [
    `${this.currentYear - 1}-${this.currentYear.toString().slice(-2)}`,
    `${this.currentYear}-${(this.currentYear + 1).toString().slice(-2)}`,
  ];
  financialYear: string = '-- Choose Financial Year --';

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }

  setFinancialYear() {
    console.log(this.financialYear)
  }

  logIn() {
    localStorage.setItem('financialYear', this.financialYear)
    if (!this.sbu_id) {
      this.common.showAlertMessage('Select SBU', this.common.errContent)
      return
    }
    if (!this.userName) {
      this.common.showAlertMessage('Enter username', this.common.errContent)
      return
    }
    if (!this.password) {
      this.common.showAlertMessage('Enter password', this.common.errContent)
      return
    }
    const data = {
      sbu_id: this.sbu_id,
      username: this.userName,
      password: this.password
    };
    this.rest.dashboardLogIn(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response[0] == 0) {
            this.common.showAlertMessage('Please enter correct username or select admin', this.common.errContent);
            return;
          }
          if (res.response.length > 0) {
            sessionStorage.setItem('sbu_id', this.sbu_id);
            sessionStorage.setItem('sbu_name', this.sbu_name);
            sessionStorage.setItem('loggedPersonName', res.response[0].sales_person_name);
            sessionStorage.setItem('loggedPersonDesignation', res.response[0].designation_name);
            sessionStorage.setItem('designation_id', res.response[0].designation_id);
            sessionStorage.setItem('sales_person_id', res.response[0].sales_person_id);
            this.router.navigate(['dashboard'])
            this.common.showAlertMessage('Logged in successfully', this.common.succContent);
          } else {
            this.common.showAlertMessage('No user found', this.common.errContent)
          }
        }
      } else {
        this.common.showAlertMessage('Error loggin in', this.common.errContent)
      }
    })
  }



}
