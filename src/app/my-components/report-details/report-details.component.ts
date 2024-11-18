import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';


@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent {

  formattedDate = new Date().toLocaleDateString('en-GB');

  customerList: any = [];
  customerId = '' as any;
  startDate: any;
  endDate: any;
  reportType: string = '';
  reportList: any = [];

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }

  ngOnInit(): void {
    this.getCustomerList()
  }

  //********** For get Customer List **********//
  getCustomerList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id')
    };
    this.rest.getCustomerList_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.customerList = [];
        if (res.response) {
          if (res.response.length > 0) {
            this.customerList = res.response;
            // this.totalCustomerCount = res.total_count;
          }
        }
      }
    })
  }


  //************ show enquiry report ************//
  showEnquiryReport(type: string) {
    this.reportType = type;
    const data = {
      customer_id: this.customerId,
      start_date: this.startDate,
      end_date: this.endDate,
      type: this.reportType,
    }
    this.rest.showEnquiryReport_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.reportList = res.response;
          }
        }
      }
    })
  }


  //************ export enquiry report ************//

  exportEnquiryReport(type: string) {
    this.reportType = type;
    const data = {
      customer_id: this.customerId,
      start_date: this.startDate,
      end_date: this.endDate,
      type: this.reportType,
    }
    this.rest.exportEnquiryReport_rest(data).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'enquiry-report.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, error => {
      console.error('Error:', error);
    });
  }
}

