import { Component } from '@angular/core';
import { RestService } from 'src/app/my-services/rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent {
  enquiryId: any;
  salesPersonName: any;
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

  constructor(private route: ActivatedRoute, private rest: RestService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.enquiryId = params['enquiry_id'];
    })
    this.getEnquiryById();
  }
  
  getEnquiryById() {
    const data = {
      enquiry_id: this.enquiryId,
      sbu_id: localStorage.getItem('sbu_id')
    }
    this.rest.getEnquiryById_rest(data).subscribe((res: any) => {
      if(res.success) {
        if(res.response) {
          this.salesPersonName = res.response[0].sales_person_name,
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
}
