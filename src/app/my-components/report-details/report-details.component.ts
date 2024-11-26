import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.css']
})
export class ReportDetailsComponent {

  formattedDate = new Date().toLocaleDateString('en-GB');

  customerList: any = [];
  customerId = '' as any;
  startDate = '' as any;
  endDate = '' as any;
  dateFormat = '' as any;
  reportType: string = '';
  reportList: any = [];
  reportNavigationType: string = '';
  maxDate = '' as any;

  constructor(private router: Router, private rest: RestService, private common: CommonService, private route: ActivatedRoute) { 
    this.dateFormat = new Date();
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.reportNavigationType = params['reportNavigationType'];
    })
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
            this.customerList = res.response.sort((a: any, b: any) => {
              if (a.customer < b.customer) {
                return -1;
              }
              if (a.customer > b.customer) {
                return 1;
              }
              return 0;
            })
          }
        }
      }
    })
  }


  //************ show enquiry report ************//
  showEnquiryReport(type: string) {
    if (!this.customerId) {
      this.common.showAlertMessage('Select Customer', this.common.errContent)
      return
    }
    if (!this.startDate) {
      this.common.showAlertMessage('Select Start Date', this.common.errContent)
      return
    }
    if (!this.endDate) {
      this.common.showAlertMessage('Select End Date', this.common.errContent)
      return
    }
    this.reportList = [];
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
    if (!this.customerId) {
      this.common.showAlertMessage('Select Customer', this.common.errContent)
      return
    }
    if (!this.startDate) {
      this.common.showAlertMessage('Select Start Date', this.common.errContent)
      return
    }
    if (!this.endDate) {
      this.common.showAlertMessage('Select End Date', this.common.errContent)
      return
    }
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


  //************ show order report ************//
  showOrderReport(type: string) {
    if(!this.customerId) {
      this.common.showAlertMessage('Select Customer', this.common.errContent);
      return;
    }
    if(!this.startDate) {
      this.common.showAlertMessage('Select Start Date', this.common.errContent);
      return;
    }
    if(!this.endDate) {
      this.common.showAlertMessage('Select End Date', this.common.errContent)
      return
    }
    this.reportList = [];
    this.reportType = type;
    const data = {
      customer_id: this.customerId,
      start_date: this.startDate,
      end_date: this.endDate,
      type: this.reportType,
    }
    this.rest.showOrderReport_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.reportList = res.response;
          }
        }
      }
    })
  }


  //************ export order report ************//
  exportOrderReport(type: string) {
    if (!this.customerId) {
      this.common.showAlertMessage('Select Customer', this.common.errContent)
      return
    }
    if (!this.startDate) {
      this.common.showAlertMessage('Select Start Date', this.common.errContent)
      return
    }
    if (!this.endDate) {
      this.common.showAlertMessage('Select End Date', this.common.errContent)
      return
    }
    this.reportType = type;
    const data = {
      customer_id: this.customerId,
      start_date: this.startDate,
      end_date: this.endDate,
      type: this.reportType,
    }
    this.rest.exportOrderReport_rest(data).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'order-report.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, error => {
      console.error('Error:', error);
    });
  }

}

