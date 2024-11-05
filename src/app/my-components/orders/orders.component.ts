import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';
// import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {


  sbuId: any = localStorage.getItem('sbu_id');
  checkSbuId: any = localStorage.getItem('sbu_id');
  salesPersonId = '' as any;
  customerId = '' as any;
  poNumber: string = '';
  poDate: any;
  poType: any;
  poTypeList: any = [];
  basicPoValue: string = '';
  totalPoValue: string = '';
  completionDate: any;
  actualCompletionDate: any;
  poUpload: any;
  completionUpload: any;
  credentialUpload: any;
  salesPersonList: any = [];
  poTypeId: any;

  customerBySalespersonList = [] as any;
  customerList: any = [];
  totalOrderCount: number = 0;

  credential_Photo: string = '';
  completion_Photo: string = '';
  po_Photo: string = '';
  orderList: any = [];

  supplyProduct: string = '';
  supplyDescription: string = '';
  supplyBrand: string = '';
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
  isEdit: boolean = false;
  orderId: any;

  filterByKeyword: string = '';
  filteredOrderListByCategory: any = []
  ordersByFilter: any = ''
  SBUList: any = [];
  isDirectOrder: boolean = false;


  //**************** enquiry related variables start *****************/
  enquiryList: any = [];
  enquiryId: any;
  enquiryDate: any;
  enquirySource = '' as string;
  enquiryTypeId: any = '';
  enquiryTypeList: any = [];
  enquirySubTypeId: any = '';
  basicValue: any;
  offerDate: any;
  yearFinal = '' as any;
  monthFinal = '' as any;
  principalHouse: any;
  enquirySubTypeList: any = [];
  enquiryStatus: any;
  enquiryRemarks: any;
  enquirySupport: any;


  constructor(private router: Router, private rest: RestService, private common: CommonService) { 
  }
  ngOnInit(): void {
    this.getSalesPersonList();
    this.getPOtypeList();
    this.getSBUList();
    this.getEnquiryTypeList();
    this.getEnquirySubTypeList();

    // this.getCustomerListBySalesperson();
    // this.getPoSubTypeListByPOtype();
    if(this.checkSbuId != 0) {
      this.salesPersonId = localStorage.getItem('sales_person_id');
      this.sbuId = localStorage.getItem('sbu_id')
      this.getCustomerListBySalesperson();
    }
    this.getOrderList();
    this.getEnquiryList();
  }


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


  getMentorSalesList() {
    // this.getMentorList();
    this.getSalesPersonList();

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

  // ************ static months & years **************//
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  years = ['2024', '2025'];

  decimalBasicPO() {
    if(this.basicPoValue){
      if(!this.basicPoValue.includes('.')) {
        this.basicPoValue = this.basicPoValue + '.00'
      }
    }
  }

  decimalTotalPO() {
    if(this.totalPoValue){
      if(!this.basicPoValue.includes('.')) {
        this.totalPoValue = this.totalPoValue + '.00'
      }
    }
  }

  //********* Validate PO Value inputs **************//
  validateInput(event: any): void {
    if ((event.which < 48 || event.which > 57) && event.which !== 8 && event.which !== 9 && event.which !== 46) {
      event.preventDefault();
      return;
    }
  }


  //********* Set SBU ID for create order ************/
  setSBUId(sales_person_id: any) {
    const salesperson = this.salesPersonList.find((element: any) => element.sales_person_id == sales_person_id);
    this.sbuId = salesperson.sbu_id;
  }
  //********* Set SBU ID for create order ************/


  //********* FOR total sales person list start *********//
  getSalesPersonList() {
    const data = {
      sbu_id: localStorage.getItem('sbu_id'),
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


  //************* FOR get customer list by salesperson start *************//
  getCustomerListBySalesperson() {
    this.customerBySalespersonList = []
    this.customerId = ''
    if(this.sbuId == 0) {
      this.setSBUId(this.salesPersonId);
    }
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


  //*********** get PO-type list ***********//
  getPOtypeList() {
    this.rest.getPOtypeList_rest().subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.poTypeList = [];
            this.poTypeList = res.response;
          }
        }
      }
    })
  }


  //************ get PO Sub type List ************//
  getPoSubTypeInputsByPOtype(po_type_id: any) {
    this.supplyProduct = '';
    this.supplyDescription = '';
    this.supplyBrand = '';
    this.sitcDescription = '';
    this.csCable = '';
    this.csPanel = '';
    this.csWelding = '';
    this.csClamps = '';
    this.csHsaBox = '';
    this.csOthers = '';

    if (po_type_id == 1) {
      this.isDivShow = true;
      this.supplyRow = true;
      this.csRow = false;
      this.sitcRow = false;

    } else if (po_type_id == 2) {
      this.isDivShow = true;
      this.supplyRow = false;
      this.sitcRow = true;
      this.csRow = false;

    } else if (po_type_id == 3) {
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



  //**************  upload files in order page **************//
  uploadFile(type: 'poPhoto' | 'completionPhoto' | 'credentialPhoto'): void {
    let banner1 = '' as any;
    if (type == 'poPhoto') {
      banner1 = document.getElementById('formFile1') as HTMLInputElement
    } else if (type == 'completionPhoto') {
      banner1 = document.getElementById('formFile2') as HTMLInputElement
    } else {
      banner1 = document.getElementById('formFile3') as HTMLInputElement
    }
    console.log("Banner 1", banner1)
    const file: any = banner1.files;
    console.log("Banner 1 files", banner1.files)

    if (file.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);

      // console.log("file[0]", file[0])

      reader.onload = () => {
        const fileData = new FormData();
        // console.log("fileData", fileData)
        fileData.append('file', file[0]);

        this.rest.uploadFile_rest(fileData).subscribe((res: any) => {
          if (res.success) {
            if (type == 'poPhoto') {
              this.po_Photo = res.response.newFilename
            } else if (type == 'completionPhoto') {
              this.completion_Photo = res.response.newFilename
            } else if (type == 'credentialPhoto') {
              this.credential_Photo = res.response.newFilename
            }
            this.common.showAlertMessage(res.message, this.common.succContent);
          } else {
            this.common.showAlertMessage(res.message, this.common.errContent);
          }
        })
      };
    }
  }



  //*********** create orders ***********//
  createOrder() {
    if (!this.salesPersonId) {
      this.common.showAlertMessage('Please Choose a sales incharge', this.common.errContent)
      return;
    }
    if (!this.customerId) {
      this.common.showAlertMessage('Please Choose a customer', this.common.errContent)
      return;
    }
    if (!this.poNumber) {
      this.common.showAlertMessage('Please enter PO number', this.common.errContent)
      return;
    }
    if (!this.poDate) {
      this.common.showAlertMessage('Please select a PO date', this.common.errContent)
      return;
    }
    if (!this.poTypeId) {
      this.common.showAlertMessage('Please Choose a PO Type', this.common.errContent)
      return;
    }
    if (this.poTypeId == 1) {
      if (!this.supplyProduct) {
        this.common.showAlertMessage('Please enter Supply Product', this.common.errContent)
        return;
      }
      if (!this.supplyDescription) {
        this.common.showAlertMessage('Please enter Supply Description', this.common.errContent)
        return;
      }
      if (!this.supplyBrand) {
        this.common.showAlertMessage('Please enter Supply Brand', this.common.errContent)
        return;
      }
    }
    if (this.poTypeId == 2) {
      if (!this.sitcDescription) {
        this.common.showAlertMessage('Please enter SITC Description', this.common.errContent)
        return;
      }
    }
    if (this.poTypeId == 3 && !this.isOthersChecked) {
      if (!this.csCable) {
        this.common.showAlertMessage('Please enter Cable', this.common.errContent)
        return;
      }
      if (!this.csPanel) {
        this.common.showAlertMessage('Please enter Panel', this.common.errContent)
        return;
      }
      if (!this.csWelding) {
        this.common.showAlertMessage('Please enter Welding', this.common.errContent)
        return;
      }
      if (!this.csHsaBox) {
        this.common.showAlertMessage('Please enter HAS Box', this.common.errContent)
        return;
      }
    } else if(this.poTypeId == 3 && this.isOthersChecked){
      if(!this.csOthers){
        this.common.showAlertMessage('Please enter Others', this.common.errContent)
        return;
      }
    }


    if (!this.basicPoValue) {
      this.common.showAlertMessage('Please enter Basic PO Value', this.common.errContent)
      return;
    }
    if (!this.totalPoValue) {
      this.common.showAlertMessage('Please enter Total PO Value', this.common.errContent)
      return;
    }
    if (!this.completionDate) {
      this.common.showAlertMessage('Please select completion date', this.common.errContent)
      return;
    }
    // if(!this.actualCompletionDate){
    //   this.common.showAlertMessage('Please select actual completion date', this.common.errContent)
    //   return;
    // }
    if (!this.poUpload) {
      this.common.showAlertMessage('Please set file for PO', this.common.errContent)
      return;
    }
    // if(!this.completionUpload){
    //   this.common.showAlertMessage('Please set file for completion', this.common.errContent)
    //   return;
    // }
    // if(!this.credentialUpload){
    //   this.common.showAlertMessage('Please set file for credential', this.common.errContent)
    //   return;
    // }

    const data = {
      sales_person_id: this.salesPersonId,
      sbu_id: this.sbuId,
      customer_id: this.customerId,
      po_number: this.poNumber,
      po_date: this.poDate,
      po_type_id: this.poTypeId,
      // po_subtype_id: this.poSubTypeId,
      basic_po_value: this.basicPoValue,
      total_po_value: this.totalPoValue,
      scheduled_completion_date: this.completionDate,
      actual_completion_date: this.actualCompletionDate,
      purchase_order_file: this.po_Photo,
      completion_file: this.completion_Photo,
      credential_file: this.credential_Photo,
      product: this.supplyProduct,
      supply_description: this.supplyDescription,
      brand: this.supplyBrand,
      sitc_description: this.sitcDescription,
      cable_assembly: this.csCable,
      panel: this.csPanel,
      welding_receptable: this.csWelding,
      clamps: this.csClamps,
      hsa_box: this.csHsaBox,
      others: this.csOthers,
    }
    this.rest.createOrder_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.sbuId = this.checkSbuId != 0 ? this.checkSbuId : '';
        this.salesPersonId = this.checkSbuId != 0 ? localStorage.getItem('sales_person_id') : '';
        this.customerId = '';
        this.poNumber = '';
        this.poDate = '';
        this.poTypeId = '';
        this.basicPoValue = '';
        this.totalPoValue = '';
        this.completionDate = '';
        this.actualCompletionDate = null;
        this.po_Photo = '';
        this.completion_Photo = '';
        this.credential_Photo = '';
        this.poUpload = '';
        this.completionUpload = '';
        this.credentialUpload = '';
        this.supplyProduct = '';
        this.supplyDescription = '';
        this.supplyBrand = '';
        this.sitcDescription = '';
        this.csCable = '';
        this.csPanel = '';
        this.csWelding = '';
        this.csClamps = '';
        this.csHsaBox = '';
        this.isOthersChecked = false;
        this.csOthers = '';
        this.isOthersDisabled = true;
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.isDivShow = false;
        this.getOrderList();
      }
    })

  }



  //*************** get order list ***************//
  getOrderList() {
    this.orderList = [];
    const data = {
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id')
    }
    this.rest.getOrderList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.orderList = res.response;
            this.totalOrderCount = res.total_count;
          }
        }
      }
    })
  }


  //*********** DETAILS view ***********//
  goToDetailsPage(order_id: any) {
    this.router.navigate(['detailsPage'], { queryParams: { view: 'orders', id: order_id } });
  }


  //*********** Get order by ID for edit *************/
  getOrderById(order_id: any) {
    this.isEdit = true
    this.orderId = order_id;
    const data = {
      order_id: order_id,
    }
    this.rest.getOrderById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.salesPersonId = res.response[0].sales_person_id
          if (this.salesPersonId) {
            this.getCustomerListBySalesperson()
          }
          this.customerId = res.response[0].customer_id
          this.poNumber = res.response[0].po_number
          this.poDate = res.response[0].po_date
          this.poTypeId = res.response[0].po_type_id
          if (this.poTypeId) {
            this.isDivShow = true;
            if (this.poTypeId == 1) {
              this.supplyRow = true;
              this.sitcRow = false;
              this.csRow = false;
            }
            else if (this.poTypeId == 2) {
              this.supplyRow = false;
              this.sitcRow = true;
              this.csRow = false;
            }
            else if (this.poTypeId == 3) {
              this.supplyRow = false;
              this.sitcRow = false;
              this.csRow = true;
            }
          }
          this.basicPoValue = res.response[0].basic_po_value
          this.totalPoValue = res.response[0].total_po_value
          this.completionDate = res.response[0].scheduled_completion_date
          this.actualCompletionDate = res.response[0].actual_completion_date
          this.po_Photo = res.response[0].purchase_order_file
          this.completion_Photo = res.response[0].completion_file
          this.credential_Photo = res.response[0].credential_file
          this.poUpload = res.response[0].purchase_order_file
          this.completionUpload = res.response[0].completion_file
          this.credentialUpload = res.response[0].credential_file
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

  //*********** create orders ***********//
  editOrder() {
    if (!this.salesPersonId) {
      this.common.showAlertMessage('Please Choose a sales incharge', this.common.errContent)
      return;
    }
    if (!this.customerId) {
      this.common.showAlertMessage('Please Choose a customer', this.common.errContent)
      return;
    }
    if (!this.poNumber) {
      this.common.showAlertMessage('Please enter PO number', this.common.errContent)
      return;
    }
    if (!this.poDate) {
      this.common.showAlertMessage('Please select a PO date', this.common.errContent)
      return;
    }
    if (!this.poTypeId) {
      this.common.showAlertMessage('Please Choose a PO Type', this.common.errContent)
      return;
    }
    // if (!this.poSubTypeId) {
    //   this.common.showAlertMessage('Please Choose a PO sub type', this.common.errContent)
    //   return;
    // }
    if (!this.basicPoValue) {
      this.common.showAlertMessage('Please enter Basic PO Value', this.common.errContent)
      return;
    }
    if (!this.totalPoValue) {
      this.common.showAlertMessage('Please enter Total PO Value', this.common.errContent)
      return;
    }
    if (!this.completionDate) {
      this.common.showAlertMessage('Please select completion date', this.common.errContent)
      return;
    }
    // if(!this.actualCompletionDate){
    //   this.common.showAlertMessage('Please select actual completion date', this.common.errContent)
    //   return;
    // }
    if (!this.poUpload) {
      this.common.showAlertMessage('Please set file for PO', this.common.errContent)
      return;
    }
    // if(!this.completionUpload){
    //   this.common.showAlertMessage('Please set file for completion', this.common.errContent)
    //   return;
    // }
    // if(!this.credentialUpload){
    //   this.common.showAlertMessage('Please set file for credential', this.common.errContent)
    //   return;
    // }

    const data = {
      order_id: this.orderId,
      sales_person_id: this.salesPersonId,
      sbu_id: this.sbuId,
      customer_id: this.customerId,
      po_number: this.poNumber,
      po_date: this.poDate,
      po_type_id: this.poTypeId,
      // po_subtype_id: this.poSubTypeId,
      basic_po_value: this.basicPoValue,
      total_po_value: this.totalPoValue,
      scheduled_completion_date: this.completionDate,
      actual_completion_date: this.actualCompletionDate,
      purchase_order_file: this.po_Photo,
      completion_file: this.completion_Photo,
      credential_file: this.credential_Photo,
      product: this.supplyProduct,
      supply_description: this.supplyDescription,
      brand: this.supplyBrand,
      sitc_description: this.sitcDescription,
      cable_assembly: this.csCable,
      panel: this.csPanel,
      welding_receptable: this.csWelding,
      clamps: this.csClamps,
      hsa_box: this.csHsaBox,
      others: this.csOthers,
    }
    this.rest.editOrder_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.sbuId = this.checkSbuId != 0 ? this.checkSbuId : '';
        this.salesPersonId = this.checkSbuId != 0 ? localStorage.getItem('sales_person_id') : '';
        this.customerId = '';
        this.poNumber = '';
        this.poDate = '';
        this.poTypeId = '';
        this.basicPoValue = '';
        this.totalPoValue = '';
        this.completionDate = '';
        this.actualCompletionDate = null;
        this.po_Photo = '';
        this.completion_Photo = '';
        this.credential_Photo = '';
        this.poUpload = '';
        this.completionUpload = '';
        this.credentialUpload = '';
        this.supplyProduct = '';
        this.supplyDescription = '';
        this.supplyBrand = '';
        this.sitcDescription = '';
        this.csCable = '';
        this.csPanel = '';
        this.csWelding = '';
        this.csClamps = '';
        this.csHsaBox = '';
        this.isOthersChecked = false;
        this.csOthers = '';
        this.isOthersDisabled = true;
        this.isEdit = false;
        this.common.showAlertMessage(res.message, this.common.succContent);
        this.getOrderList();
      }
    })

  }

  // ******************** filter orders list by category ******************** //
  getFilterOrdersByCategory() {
    this.filteredOrderListByCategory = [];
    const data = {
      filterby_keyword: this.filterByKeyword
    }
    this.rest.getFilterOrdersByCategory_rest(data).subscribe((res: any) => {
      if(res.success) {
        if(res.response) {
          if(res.response.length > 0) {
            this.filteredOrderListByCategory = res.response;
          }
        }
      }
    })
  }

  getOrdersByFilter() {
    this.orderList = [];
    this.totalOrderCount = 0
    const data = {
      filter_by: this.filterByKeyword,
      filter_by_value: this.ordersByFilter,
    }
    this.rest.getOrdersByFilter_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.orderList = res.response;
            this.totalOrderCount = res.total_count;
          }
        }
      }
    })
  }

  makeIsDirectFalse(){
    this.isDirectOrder = false;
  }

  makeIsDirectTrue(){
    this.isDirectOrder = true;
  }

  //********** get enquiry listing start **********//
  getEnquiryList() {
    const data = {
      check_designation_id: localStorage.getItem('designation_id'),
      sbu_id: localStorage.getItem('sbu_id'),
      sales_person_id: localStorage.getItem('sales_person_id')
    }
    this.rest.getEnquiryList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.enquiryList = [];
            this.enquiryList = res.response;
          }
        }
      }
    })
  }

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

  //******************* get enquiry details by ID **************//
  getEnquiryById(enquiry_id: any) {
    this.enquiryId = enquiry_id;
    const data = {
      sbu_id: this.checkSbuId,
      enquiry_id: enquiry_id
    }
    this.rest.getEnquiryById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.sbuId = res.response[0].sbu_id
          // if(this.sbuId){
            // this.getMentorList();
          //   this.getSalesPersonList();
          // }
          // this.mentorId = res.response[0].mentor_id
          this.salesPersonId = res.response[0].sales_person_id
          if (this.salesPersonId) {
            this.getCustomerListBySalesperson();
            // this.setSBUId(this.salesPersonId);
          }
          this.customerId = res.response[0].customer_id
          this.enquiryDate = res.response[0].enquiry_date
          this.enquirySource = res.response[0].enquiry_source
          this.principalHouse = res.response[0].principal_house
          this.enquiryTypeId = res.response[0].enquiry_type_id
          this.enquirySubTypeId = res.response[0].enquiry_sub_type_id
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
}
