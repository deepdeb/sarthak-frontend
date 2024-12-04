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
  salesPersonId: any;
  // mentorName: string = '';
  reffNumber: any;
  customer_creation_date: any;
  customer_Name: string = '';
  sbuName: string = '';
  segmentName: string = '';
  subSegmentName: string = '';
  contactPersonName: string = '';
  designationName: string = '';
  departmentName: string = '';
  mobileNumber: any;
  altMobileNumber: any;
  emailAdderss: string = '';
  altEmailAddress: string = '';
  streetNumber: string = '';
  streetName: string = '';
  areaName: string = '';
  locationName: string = '';
  cityName: string = '';
  districtName: string = '';
  stateName: string = '';
  pinNumber: any;
  productCategory: any = [];
  otherProductCategory: string = ''
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

  poNumber: string = '';
  poDate: any;
  poType: any;
  basicPoValue: string = '';
  totalPoValue: string = '';
  completionDate: any;
  actualCompletionDate: any;
  poUpload: any;
  completionUpload: any;
  credentialUpload: any;
  supplyProduct: string = '';
  supplyBrand: string = '';
  supplyDescription: string = '';
  sitcDescription: string = '';
  csCable: string = '';
  csPanel: string = '';
  csWelding: string = '';
  csClamps: string = '';
  csHsaBox: string = '';
  csOthers: string = '';
  sbuId: any = localStorage.getItem('sbu_id');
  // SBUList: any = [];
  // credential_Photo: string = '';
  // completion_Photo: string = '';
  // po_Photo: string = '';

  companyName: string = '';
  contactPerson: string = '';
  mobNo: any;
  emailId: string = '';
  addreSS: string = '';
  stateId = '' as any;
  pinNo: any;




  constructor(private rest: RestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.details_id = params['id'];
      this.view = params['view'];
    })
    this.view == 'customer' ? this.getCustomerDetailsById(this.details_id) : this.view == 'salesperson' ? this.getSalespersonById(this.details_id) : this.view == 'orders' ? this.getOrderById(this.details_id) : this.view == 'addCompany' ? this.getCompanyById(this.details_id) : this.getEnquiryById(this.details_id);
  }



  //************ customer view details ************//

  getCustomerDetailsById(customer_details_id: any) {
    const data = {
      customer_id: customer_details_id
    }
    this.rest.getCustomerDetailsById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response && res.response.length > 0) {
          this.customer_creation_date = res.response[0].customer_create_date;
          this.salesIncharge = res.response[0].sales_person_name;
          // this.mentorName = res.response[0].mentor_name;
          this.sbuName = res.response[0].sbu_name
          this.segmentName = res.response[0].segment_name
          this.subSegmentName = res.response[0].subsegment_name
          this.contactPersonName = res.response[0].name
          this.designationName = res.response[0].designation
          this.departmentName = res.response[0].department
          this.mobileNumber = res.response[0].mobile
          this.altMobileNumber = res.response[0].alt_mobile
          this.emailAdderss = res.response[0].email
          this.altEmailAddress = res.response[0].alt_email
          this.customer_Name = res.response[0].customer
          this.streetNumber = res.response[0].street_no
          this.streetName = res.response[0].street_name
          this.areaName = res.response[0].area
          this.locationName = res.response[0].location
          this.cityName = res.response[0].city
          this.districtName = res.response[0].district
          this.stateName = res.response[0].state_name
          this.pinNumber = res.response[0].pin
          this.productCategory = res.product_categories
          this.otherProductCategory = res.response[0].other_product_category
        }
      }
    })
  }


  //************ sales person view details ************//
  getSalespersonById(sales_person_details_id: any) {
    const data = {
      sales_person_id: sales_person_details_id
    }
    this.rest.getSalespersonById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
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



  //************ enquiry view details ************//

  getEnquiryById(enquiry_details_id: any) {
    const data = {
      sbu_id: localStorage.getItem('sbu_id'),
      enquiry_id: enquiry_details_id
    }
    this.rest.getEnquiryById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.enquiryId = res.response[0].enquiry_id
          this.salesIncharge = res.response[0].sales_person_name
          this.reffNumber = res.response[0].reff_number;
          this.customer_Name = res.response[0].customer
          this.enquiryDate = res.response[0].enquiry_date
          this.principalHouse = res.response[0].principal_house
          this.enquirySource = res.response[0].enquiry_source
          this.basicValue = res.response[0].basic_value
          this.offerDate = res.response[0].offer_date
          this.yearFinal = res.response[0].tentative_finalization_year
          this.monthFinal = res.response[0].tentative_finalization_month
          this.enquiryStatus = res.response[0].status_initial
          this.enquiryRemarks = res.response[0].remarks_initial
          this.enquirySupport = res.response[0].support_initial
        }
      }
    })
  }


  //************ order view details ************//
  getOrderById(order_details_id: any) {
    const data = {
      order_id: order_details_id,
    }
    this.rest.getOrderById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.sbuName = res.response[0].sbu_name
          this.salesIncharge = res.response[0].sales_person_name
          this.reffNumber = res.response[0].reff_number;
          this.customer_Name = res.response[0].customer
          this.poNumber = res.response[0].po_number
          this.poDate = res.response[0].po_date
          this.poType = res.response[0].po_type_name
          this.basicPoValue = res.response[0].basic_po_value
          this.totalPoValue = res.response[0].total_po_value
          this.completionDate = res.response[0].scheduled_completion_date
          this.actualCompletionDate = res.response[0].actual_completion_date
          this.supplyProduct = res.response[0].product
          this.supplyDescription = res.response[0].supply_description
          this.supplyBrand = res.response[0].brand
          this.sitcDescription = res.response[0].sitc_description
          this.csCable = res.response[0].cable_assembly
          this.csPanel = res.response[0].panel
          this.csWelding = res.response[0].welding_receptable
          this.csClamps = res.response[0].clamps
          this.csHsaBox = res.response[0].hsa_box
          this.csOthers = res.response[0].others
        }
      }
    })
  }

  // ************* company view details ************** //

  getCompanyById(company_details_id: any) {
    const data = {
      
      sbu_id: company_details_id
    }
    this.rest.getCompanyById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.companyName = res.response[0].sbu_name
          this.contactPerson = res.response[0].contact_person
          this.mobNo = res.response[0].contact_number
          this.emailId = res.response[0].email
          this.addreSS = res.response[0].address
          this.cityName = res.response[0].city
          this.stateName = res.response[0].state_name
          this.pinNo = res.response[0].pin
        }
      }
    })
  }
}
