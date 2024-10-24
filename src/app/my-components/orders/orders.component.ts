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
  supplyBrand: string = '';
  description: string = '';
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

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }
  ngOnInit(): void {
    this.getPOtypeList();
    this.getSalesPersonList();
    // this.getCustomerListBySalesperson();
    // this.getPoSubTypeListByPOtype();
    this.getOrderList();
  }

  decimalFilter_1() {
    this.basicPoValue = this.basicPoValue + '.00'
    // this.totalPoValue = this.totalPoValue + '.00'
  }

  decimalFilter_2() {
    // this.basicPoValue = this.basicPoValue + '.00'
    this.totalPoValue = this.totalPoValue + '.00'
  }


  //********* Set SBU ID for create enquiry ************/
  setSBUId(sales_person_id: any) {
    console.log(sales_person_id);
    console.log(this.salesPersonList);

    const salesperson = this.salesPersonList.find((element: any) => element.sales_person_id == sales_person_id);
    this.sbuId = salesperson.sbu_id;
  }
  //********* Set SBU ID for create enquiry ************/


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
    this.setSBUId(this.salesPersonId);
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
            // console.log("PO Type List",this.poTypeList)

          }
        }
      }
    })
  }


  //************ get PO Sub type List ************//
  getPoSubTypeInputsByPOtype(po_type_id: any) {
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
  } else {
    this.isOthersDisabled = true;
    this.csOthers = ''
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
      description: this.description,
      brand: this.supplyBrand,
      cable_assembly:this.csCable,
      panel: this.csPanel,
      welding_receptable: this.csWelding,
      clamps: this.csClamps,
      hsa_box: this.csHsaBox,
      others: this.csOthers,
    }
    this.rest.createOrder_rest(data).subscribe((res: any) => {
      if (res.success) {
        this.sbuId = '';
        this.salesPersonId = '';
        this.customerId = '';
        this.poNumber = '';
        this.poDate = '';
        this.poTypeId = '';
        this.basicPoValue = '';
        this.totalPoValue = '';
        this.completionDate = '';
        this.actualCompletionDate = '';
        this.po_Photo = '';
        this.completion_Photo = '';
        this.credential_Photo = '';
        this.poUpload = '';
        this.completionUpload = '';
        this.credentialUpload = '';
        this.supplyProduct= '';
        this.description= '';
        this.supplyBrand= '';
        this.csCable= '';
        this.csPanel= '';
        this.csWelding= '';
        this.csClamps= '';
        this.csHsaBox= '';
        this.csOthers= '';
        this.common.showAlertMessage(res.message, this.common.succContent);
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
            // console.log("OrderList >>>>>>>", this.orderList)
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





}
