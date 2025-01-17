import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';



@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent {
  customer_Name: string = '';
  sbuId: any = localStorage.getItem('sbu_id');
  salesPersonList: any = [];
  salesPersonId = '' as any;
  reffNumber: any;
  customerList: any = [];
  customerId = '' as any;
  enquiryDate: any;
  enquirySource = '' as string;
  principalHouse: any;
  enquiryTypeId: any = '';
  enquirySubTypeId: any = '';
  basicValue: any;
  offerDate: any;
  yearFinal = '' as any;
  monthFinal = '' as any;
  enquiryStatus: any;
  enquiryRemarks: any;
  enquirySupport: any;
  enquiryTypeList: any = [];
  enquirySubTypeList: any = [];
  enquiryList: any = [];
  enquiryId: any;
  totalCount: number = 0;
  isEdit: boolean = false;

  checkSbuId: any = localStorage.getItem('sbu_id')
  checkSalesPersonId: any = localStorage.getItem('sales_person_id')
  checkDesignationId: any = localStorage.getItem('designation_id');
  customerBySalespersonList = [] as any;

  mentorList: any = [];
  mentorId: any = '';
  SBUList: any = [];
  filteredEnquiryListByCategory: any = []
  filterByKeyword: string = ''
  enquiriesByFilter: string = ''
  lastEnquiryNumber: number = 0
  enquiryNumber: string = ''
  lastEnquiryNumberString: string = ''
  nextEnquiryNumber: string = ''

  productProduct: string = '';
  productDescription: string = '';
  productBrand: string = '';
  sitcDescription: string = '';
  csCable: string = '';
  csPanel: string = '';
  csWelding: string = '';
  csClamps: string = '';
  csHsaBox: string = '';
  csOthers: string = '';

  isDivShow: boolean = false
  supplyRow: boolean = false;
  sitcRow: boolean = false;
  csRow: boolean = false;
  isOthersDisabled: boolean = true;
  isOthersChecked: boolean = false;
  orderId: any;

  searchCriteria: string = '';
  enquiryOffset : number =  0;

  // ************ static months & years **************//
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  years = ['2024', '2025'];



  constructor(private router: Router, private common: CommonService, private rest: RestService) { }

  ngOnInit(): void {
    // this.getSalesPersonList();
    this.getCustomerList();
    this.getEnquiryTypeList();
    this.getEnquirySubTypeList();
    this.getEnquiryList();
    this.getSBUList();
    if (this.sbuId != 0) {
      this.getMentorSalesList();
    }
  }


  previousList(){
    this.enquiryOffset = this.enquiryOffset > 0 ? this.enquiryOffset - 10 : 0;
    this.getEnquiryList();
  }
  nextList(){
    this.enquiryOffset =  this.enquiryOffset + 10 ;
    this.getEnquiryList();
  }


  //********** For get Customer List **********//
  getCustomerList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      // sales_person_id: localStorage.getItem('sales_person_id')
      sales_person_id: this.salesPersonId
    };
    this.rest.getCustomerList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.customerList = [];
            this.customerList = res.response;
            // this.totalCount = res.total_count;
          }
        }
      }
    })
  }

  //************ get PO Sub type List ************//

  getPoSubTypeInputsByPOtype(enquiry_sub_type_id: any) {
    this.productProduct = '';
    this.productDescription = '';
    this.productBrand = '';
    this.sitcDescription = '';
    this.csCable = '';
    this.csPanel = '';
    this.csWelding = '';
    this.csClamps = '';
    this.csHsaBox = '';
    this.csOthers = '';

    if (enquiry_sub_type_id == 1) {
      this.isDivShow = true;
      this.supplyRow = true;
      this.csRow = false;
      this.sitcRow = false;

    } else if (enquiry_sub_type_id == 2) {
      this.isDivShow = true;
      this.supplyRow = false;
      this.sitcRow = true;
      this.csRow = false;

    } else if (enquiry_sub_type_id == 3) {
      this.isDivShow = true;
      this.supplyRow = false;
      this.sitcRow = false;
      this.csRow = true
    }
  }

  //********** Check box logic **********//
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.isOthersDisabled = false;
      this.csCable = '';
      this.csPanel = '';
      this.csWelding = '';
      this.csHsaBox = '';
    } else {
      this.isOthersDisabled = true;
      this.csOthers = '';

    }
  }



  //********* FOR get customer list by salesperson start *********//
  getCustomerListBySalesperson() {
    this.customerBySalespersonList = []
    this.customerId = ''
    // this.setSBUId(this.salesPersonId);
    const data = {
      sales_person_id: this.salesPersonId
    }
    this.rest.getCustomerListBySalesperson_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.customerBySalespersonList = res.response;
          }
        }
      }
    })
  }
  //********* FOR get customer list by salesperson end **********/


  // ************* get SBU List start **************//
  getSBUList() {
    const data = {
      sbu_id: this.sbuId
    }
    this.rest.getSBUList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.SBUList = [];
            this.SBUList = res.response;
          }
        }
      }
    })
  }
  // ************* get SBU List end **************//



  //********* Set SBU ID for create enquiry ************/
  // setSBUId(sales_person_id: any) {
  //   console.log(sales_person_id);
  //   console.log(this.salesPersonList);

  //   const salesperson = this.salesPersonList.find((element: any) => element.sales_person_id == sales_person_id);
  //   this.sbuId = salesperson.sbu_id;
  // }
  //********* Set SBU ID for create enquiry ************/



  //********* FOR total sales person list start *********//
  getSalesPersonList() {
    const data = {
      sbu_id: this.sbuId,
      sales_person_id: localStorage.getItem('sales_person_id')
    };
    this.rest.getSalesPersonList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.salesPersonList = [];
          this.salesPersonList = res.response;
        }
      }
    })
  }
  //********* FOR total sales person list end *********//



  //*********** get enquiry type list start *********//
  getEnquiryTypeList() {
    this.rest.getEnquiryTypeList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquiryTypeList = [];
            this.enquiryTypeList = res.response;
          }
        }
      }
    })
  }


  //*********** get enquiry sub type list start *********//
  getEnquirySubTypeList() {
    this.rest.getEnquirySubTypeList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquirySubTypeList = [];
            this.enquirySubTypeList = res.response;
          }
        }
      }
    })
  }


  //************* Create Enquiry start *************//
  createEnquiry() {
    if (!this.sbuId) {
      this.common.showAlertMessage('Please choose SBU', this.common.errContent);
      return;
    }
    if (!this.mentorId) {
      this.common.showAlertMessage('Please choose Mentor', this.common.errContent);
      return;
    }
    if (!this.salesPersonId) {
      this.common.showAlertMessage('Please choose Sales Person', this.common.errContent);
      return;
    }
    if (!this.customerId) {
      this.common.showAlertMessage('Please choose customer', this.common.errContent);
      return;
    }
    if (!this.enquiryDate) {
      this.common.showAlertMessage('Please set Enquiry Date', this.common.errContent);
      return;
    }
    if (!this.enquirySource) {
      this.common.showAlertMessage('Plese enter source of enquiry', this.common.errContent)
      return;
    }
    if (!this.enquiryTypeId) {
      this.common.showAlertMessage('Please choose type of enquiry', this.common.errContent);
      return;
    }
    if (!this.enquirySubTypeId) {
      this.common.showAlertMessage('Please choose enquiry sub type', this.common.errContent);
      return;
    }
    if (this.enquirySubTypeId == 1) {
      if (!this.productProduct) {
        this.common.showAlertMessage('Please enter product', this.common.errContent);
        return;
      }
      if (!this.productDescription) {
        this.common.showAlertMessage('Please enter product description', this.common.errContent);
        return;
      }
      if (!this.productBrand) {
        this.common.showAlertMessage('Please enter product brand', this.common.errContent);
        return;
      }
    }
    if (this.enquirySubTypeId == 2) {
      if (!this.sitcDescription) {
        this.common.showAlertMessage('Please enter SITC description', this.common.errContent);
        return;
      }
    }
    if (this.enquirySubTypeId == 3 && !this.isOthersChecked) {
      if (!this.csCable && !this.csPanel && !this.csWelding && !this.csHsaBox) {
        this.common.showAlertMessage('Please enter anyone of cable assembly, panel, welding receptable , HSA Box ', this.common.errContent)
        return;
      }

    } else if (this.enquirySubTypeId == 3 && this.isOthersChecked) {
      if (!this.csOthers) {
        this.common.showAlertMessage('Please enter Others', this.common.errContent)
        return;
      }
    }
    if (!this.principalHouse) {
      this.common.showAlertMessage('Please enter Principal House', this.common.errContent);
      return;
    }

    const data = {
      sbu_id: this.sbuId,
      mentor_id: this.mentorId,
      sales_person_id: this.salesPersonId,
      enquiry_number: this.enquiryNumber,
      reff_number: this.reffNumber,
      customer_id: this.customerId,
      enquiry_date: this.enquiryDate,
      enquiry_source: this.enquirySource,
      enquiry_type_id: this.enquiryTypeId,
      enquiry_sub_type_id: this.enquirySubTypeId,
      product: this.productProduct,
      product_description: this.productDescription,
      brand: this.productBrand,
      sitc_description: this.sitcDescription,
      cable_assembly: this.csCable,
      panel: this.csPanel,
      welding_receptable: this.csWelding,
      hsa_box: this.csHsaBox,
      others: this.csOthers,
      principal_house: this.principalHouse,
      offer_date: this.offerDate,
      basic_value: this.basicValue,
      tentative_finalization_month: this.monthFinal,
      tentative_finalization_year: this.yearFinal,
      status_initial: this.enquiryStatus,
      remarks_initial: this.enquiryRemarks,
      support_initial: this.enquirySupport,
      ...(this.isEdit && { enquiry_id: this.enquiryId }),
    }
    this.rest.createEnquiry_rest(data, this.isEdit).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          // this.sbuId = ''
          this.salesPersonId = ''
          this.enquiryNumber = ''
          this.reffNumber = ''
          this.mentorId = ''
          this.customerId = ''
          this.enquiryDate = ''
          this.enquirySource = ''
          this.enquiryTypeId = ''
          this.enquirySubTypeId = ''
          this.productProduct = '';
          this.productDescription = '';
          this.productBrand = '';
          this.sitcDescription = '';
          this.csCable = '';
          this.csPanel = '';
          this.csWelding = '';
          this.csHsaBox = '';
          this.isOthersChecked = false;
          this.csOthers = '';
          this.isOthersDisabled = true;
          this.principalHouse = ''
          this.offerDate = ''
          this.basicValue = ''
          this.monthFinal = ''
          this.yearFinal = ''
          this.enquiryStatus = ''
          this.enquiryRemarks = ''
          this.enquirySupport = ''
          this.common.showAlertMessage(res.message, this.common.succContent)
          this.filterByKeyword && this.enquiriesByFilter ? this.getEnquiriesByFilter() : this.getEnquiryList()
          this.isDivShow = false;
          this.isEdit = false;
          this.supplyRow = false;
          this.sitcRow = false;
          this.csRow = false;
        }
      }
    })

  }


  //********** get enquiry listing start **********//
  getEnquiryList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id'),
      search_criteria: this.searchCriteria,
      enquiry_offset : this.enquiryOffset

    }
    this.rest.getEnquiryList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquiryList = [];
            this.enquiryList = res.response;
            this.totalCount = res.total_count;
            this.lastEnquiryNumber = res.last_enquiry_number;
            this.lastEnquiryNumberString = res.last_enquiry_number
            // this.enquiryNumber = 'E000' + (this.lastEnquiryNumber + 1) + '/24-25'
            this.nextEnquiryNumber = 'E000' + ((parseInt(this.lastEnquiryNumberString.split('/')[0].substring(1))) + 1) + '/24-25'
            this.enquiryNumber = res.enquiry_number;
          }
        }
      }
    })
  }


  decimalBasicValue() {
    if (this.basicValue) {
      if (!this.basicValue.includes('.')) {
        this.basicValue = this.basicValue + '.00'
      }
    }
  }


  //*********** DETAILS view ***********//
  goToDetailsPage(enquiry_id: any) {
    this.router.navigate(['detailsPage'], { queryParams: { view: 'enquiry', id: enquiry_id } })
  }


  getEnquiryById(enquiry_id: any) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.enquiryId = enquiry_id;
    this.isEdit = true;
    this.isDivShow = true;
    const data = {
      sbu_id: this.sbuId,
      enquiry_id: enquiry_id
    }
    this.rest.getEnquiryById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.sbuId = res.response[0].sbu_id
          if (this.sbuId) {
            this.getMentorList();
            this.getSalesPersonList();
          }
          this.mentorId = res.response[0].mentor_id
          this.salesPersonId = res.response[0].sales_person_id
          if (this.salesPersonId) {
            this.getCustomerListBySalesperson();
            // this.setSBUId(this.salesPersonId);
          }
          this.enquiryNumber = res.response[0].enquiry_number
          this.reffNumber = res.response[0].reff_number
          this.customerId = res.response[0].customer_id
          this.enquiryDate = res.response[0].enquiry_date
          this.enquirySource = res.response[0].enquiry_source
          this.principalHouse = res.response[0].principal_house
          this.enquiryTypeId = res.response[0].enquiry_type_id
          this.enquirySubTypeId = res.response[0].enquiry_sub_type_id
          this.productProduct = res.response[0].product
          this.productDescription = res.response[0].product_description
          this.productBrand = res.response[0].brand
          this.sitcDescription = res.response[0].sitc_description
          this.csCable = res.response[0].cable_assembly
          this.csPanel = res.response[0].panel
          this.csWelding = res.response[0].welding_receptable
          this.csHsaBox = res.response[0].hsa_box
          this.csOthers = res.response[0].others

          if (this.enquirySubTypeId == 1) {
            this.supplyRow = true;
          } else if (this.enquirySubTypeId == 2) {
            this.sitcRow = true;
          } else if (this.enquirySubTypeId == 3) {
            this.csRow = true;
          }

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


  // phone number validation //
  restrictPhone(event: any): void {
    if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 9 && event.which !== 46) {
      event.preventDefault();
      return;
    }
  }




  //************* for follow-up page ***************//
  goToFollowUpPage(enquiry_id: any) {
    this.router.navigate(['followUp'], { queryParams: { enquiry_id: enquiry_id } });
  }




  // **************** new form logic  ********************//
  newForm() {
    window.location.reload()
  }



  //********** For get mentor List **********//
  getMentorList() {
    const data = {
      sbu_id: this.sbuId,
    }
    this.rest.getMentorList_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.mentorList = [];
        if (res.response) {
          if (res.response.length > 0) {
            this.mentorList = res.response;
          }
        }
      }
    })
  }

  getMentorSalesList() {
    this.getSalesPersonList();

  }

  //************** Filter enquiry list by category **************/
  getFilterEnquiryByCategory() {
    this.filteredEnquiryListByCategory = [];
    const data = {
      filterby_keyword: this.filterByKeyword,
      sbu_id: this.checkSbuId,
      sales_person_id: this.checkSalesPersonId
    }
    this.rest.getFilterEnquiryByCategory_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.filteredEnquiryListByCategory = res.response
            if (this.filterByKeyword == 'tentative_finalization_month') {
              const monthOrder = {
                "APR": 1,
                "MAY": 2,
                "JUN": 3,
                "JUL": 4,
                "AUG": 5,
                "SEP": 6,
                "OCT": 7,
                "NOV": 8,
                "DEC": 9,
                "JAN": 10,
                "FEB": 11,
                "MAR": 12
              };

              this.filteredEnquiryListByCategory.forEach((item: any) => {
                if (!item.name) {
                  item.name = '';
                }
              });

              this.filteredEnquiryListByCategory.sort((a: any, b: any) => {
                const monthA = a.name as keyof typeof monthOrder;
                const monthB = b.name as keyof typeof monthOrder;

                if (a.name === '') return -1;
                if (b.name === '') return 1;
                return monthOrder[monthA] - monthOrder[monthB];
              });
            }
            else if (this.filterByKeyword == 'tentative_finalization_year') {
              this.filteredEnquiryListByCategory.forEach((item: any) => {
                if (!item.name) {
                  item.name = '';
                }
              });

              this.filteredEnquiryListByCategory.sort((a: any, b: any) => {
                if (a.name === '') return -1;
                if (b.name === '') return 1;
                return a.name - b.name;
              });
            }
          }
        }
      }
    })
  }

  //**************** Get Enquiries by desired filter **********************/
  getEnquiriesByFilter() {
    this.enquiryList = [];
    this.totalCount = 0;
    const data = {
      filter_by: this.filterByKeyword,
      filter_by_value: this.enquiriesByFilter,
      sales_person_id: this.checkSalesPersonId,
      sbu_id: this.checkSbuId
    }
    this.rest.getEnquiriesByFilter_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquiryList = res.response;
            this.totalCount = res.total_count;
          }
        }
      }
    })
  }

}


