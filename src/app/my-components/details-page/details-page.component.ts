import { Component } from '@angular/core';
import { RestService } from 'src/app/my-services/rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent {

  salesIncharge: string = '';
  mentorName: string = '';
  customer_creation_date: any;
  customer_Name: string = '';
  sbuName: string = '';
  segmentName: string = '';
  subSegmentName: string = '';
  contactPersonName: string = '';
  designationName: string = '';
  departmentName: string = '';
  mobileNumber: any;
  emailAdderss: string = '';
  streetNumber: string = ''; 
  streetName: string = '';
  areaName: string = '';
  locationName: string = '';
  cityName: string = '';
  districtName: string = '';
  stateName: string = '';
  pinNumber: any;
  productCategory: string = ''; 
  view: any;
  details_id: any;

  enquiryId: any;
  enquiryDate: any;
  principalHouse: any;
  enquirySource: any;
  basicValue: any;
  offerDate: any;
  yearFinal: any;
  monthFinal: any;
  enquiryStatus: any;
  enquiryRemarks: any;
  enquirySupport: any;

  functionName: string = '';
  DOB: any;



  constructor(private rest: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.details_id = params['id'];
      this.view = params['view'];
    })
    this.view == 'customer' ? this.getCustomerDetailsById(this.details_id) : this.view == 'salesperson' ? this.getSalespersonById(this.details_id) : this.getEnquiryById(this.details_id);
  }

  getCustomerDetailsById(customer_id: any){
    // console.log('called customer details')
    const data = {
      customer_id: customer_id
    }
    this.rest.getCustomerDetailsById_rest(data).subscribe((res: any) =>{
      if(res.success){
        if(res.response){
          this.customer_creation_date = res.response.date;
          this.salesIncharge = res.response.sales_person_name;
          this.mentorName = res.response.mentor;
          this.sbuName = res.response.sbu_name
          this.segmentName = res.response.segment_name
          this.subSegmentName = res.response.subsegment_name
          this.contactPersonName = res.response.name
          this.designationName = res.response.designation
          this.departmentName = res.response.department
          this.mobileNumber = res.response.mobile
          this.emailAdderss = res.response.email
          this.customer_Name = res.response.customer
          this.streetNumber = res.response.street_no
          this.streetName = res.response.street_name
          this.areaName = res.response.area
          this.locationName = res.response.location
          this.cityName = res.response.city
          this.districtName = res.response.district
          this.stateName = res.response.state_name
          this.pinNumber = res.response.pin
          this.productCategory = res.response.product_category_name
        }
      }
    })
  }



  getSalespersonById(sales_person_id: any){
    // console.log('called salesperson details')
    const data = {
      sales_person_id : sales_person_id
    }
    this.rest.getSalespersonById_rest(data).subscribe((res: any) =>{
      if(res.success){
        if(res.response){
          this.sbuName = res.response.sbu_name;
          this.functionName = res.response.function_name
          this.DOB = res.response.dob
          this.salesIncharge = res.response.sales_person_name
          this.designationName = res.response.designation_name
          this.mobileNumber = res.response.mobile
          this.emailAdderss = res.response.email
        }
      }
    })
  }



  getEnquiryById(enquiry_id: any){
    const data = {
      sbu_id: localStorage.getItem('sbu_id'),
      enquiry_id: enquiry_id
    }
    this.rest.getEnquiryById_rest(data).subscribe((res: any) =>{
      if(res.success){
        if(res.response){
          console.log('res response>>>', res.response)
          this.enquiryId = res.response.enquiry_id
          this.salesIncharge = res.response.sales_person_name
          this.customer_Name = res.response.customer
          this.enquiryDate = res.response.enquiry_date
          this.principalHouse = res.response.principal_house
          this.enquirySource = res.response.enquiry_source_name
          this.basicValue = res.response.basic_value
          this.offerDate = res.response.offer_date
          this.yearFinal = res.response.tentative_finalization_year
          this.monthFinal = res.response.tentative_finalization_month
          this.enquiryStatus = res.response.status_initial
          this.enquiryRemarks = res.response.remarks_initial
          this.enquirySupport = res.response.support_initial
        }
      }
    })
  }
}
