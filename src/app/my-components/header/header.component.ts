import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  logged_person_name = localStorage.getItem('loggedPersonName');
  desig_name = localStorage.getItem('loggedPersonDesignation');
  formattedDate = new Date().toLocaleDateString('en-GB');
  formattedTime12Hr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true});

  constructor(private router: Router){}
 
  ngOnInit(): void {
  
  }

  goToLogin(){
    localStorage.clear(); 
    this.router.navigate(['/'])
    
  }
  goToMyProfile(){
    this.router.navigate(['myProfile'])    
  }

  goToAddCompany(){
    this.router.navigate(['addCompany'])
  }


  // goToDashboard(){
  //   this.router.navigate(['dashboard']) 
  // }
  // goToCustomer(){
  //   this.router.navigate(['customer']);
  // }
  // goToSalesPerson(){
  //   this.router.navigate(['sales-person']);
  // }
  // goToSegment(){
  //   this.router.navigate(['segment']);
  // }
  // goToEnquiries(){
  //   this.router.navigate(['enquiries']);
  // }
  // goToOrders(){
  //   this.router.navigate(['orders']);
  // }
  // goToPresentation(){
  //   this.router.navigate(['presentation']);
  // }
  // goToReports(){
  //   this.router.navigate(['reports']);
  // }

}
