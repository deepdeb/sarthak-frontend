import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  sbuId = localStorage.getItem('sbu_id');
  totalCustomers: number = 0;
  totalSalesperson: number = 0;
  totalSegments: number = 0;
  totalEnquiries: number = 0;
  totalOrders: number = 0;
  checkDesignationId: any = localStorage.getItem('designation_id');
  salesPersonId: any = localStorage.getItem('sales_person_id');
  SBUList: any = [];

  constructor(private router: Router, private rest: RestService) { }

  ngOnInit(): void {
    this.getDashBoardCount();
    this.getSBUList();
  }

  getDashBoardCount() {
    const data = {
      sbu_id: this.sbuId,
      check_designation_id: this.checkDesignationId,
      sales_person_id: this.salesPersonId
    };
    this.rest.getDashBoardCount(data).subscribe((res: any) => {
      if (res.success) {
        if(res.response) {
          this.totalCustomers = res.response.total_customers;
          this.totalSalesperson = res.response.total_salesperson;
          this.totalSegments = res.response.total_segments;
          this.totalEnquiries = res.response.total_enquiries;
          this.totalOrders = res.response.total_orders;
        }
      }
    })
  }

  filterUnit() {
    this.salesPersonId = ''
    this.getDashBoardCount();
  }

  checkSbuId() {
    const sbu_id = localStorage.getItem('sbu_id');
    if(sbu_id === '0') {
      return true
    } else {
      return false
    }
  }

  getSBUList() {
    const data = {
      sbu_id: this.sbuId
    }
    this.rest.getSBUList_rest(data).subscribe((res: any) => {
      if(res.success) {
        this.SBUList = []
        if(res.response) {
          if(res.response.length  > 0) {
            this.SBUList = res.response
            console.log('>>>>', res.response)
          }
        }
      }
    })
  }

}
