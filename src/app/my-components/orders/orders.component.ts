import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';



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
  poSubType: any;
  poSubTypeList: any = [];
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
  totalCustomerCount: number = 0;

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }
  ngOnInit(): void {
    this.getPOtypeList();
    this.getSalesPersonList();
    this.getCustomerListBySalesperson();
    this.getPoSubTypeListByPOtype();
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
  getPoSubTypeListByPOtype() {
    const data = {
      po_type_id: this.poTypeId
    }
    this.rest.getPoSubTypeListByPOtype_rest(data).subscribe((res: any) =>{
      if(res.success){
        if(res.response){
          if(res.response.length > 0){
            this.poSubTypeList = []
            this.poSubTypeList = res.response
          }
        }
      }
    })
  }

  //*********** create orders ***********//
  createOrder() {

  }

}
