import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class RestService {
  API_ROOT = "https://sarthakcomponents.com/";
  // API_ROOT = "http://localhost:3000/";
  constructor(private http: HttpClient) { }

  //************** FOR SBU-LIST start ***********//
  getSBUList_rest(data: any) {
    return this.http.post(this.API_ROOT + 'common/getSBUlist', data, httpOptions);
  }
  //************** FOR SBU-LIST end ************//



  //************ For  Function-name List START ************//
  getFunctionList_rest() {
    return this.http.get(this.API_ROOT + 'common/getFunctionList', httpOptions)
  }

  //************ For  Function List END ************//



  //************ For  Designation-name List START ************//
  getDesignationList_rest() {
    return this.http.get(this.API_ROOT + 'common/getDesignationList', httpOptions)
  }
  //************ For  Designation-name List end ************//



  //************ FOR SALES-PERSON start ************//
  getSalesPersonList_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'director/getSalespersonList', data, httpOptions);
  }
  createSalesPerson_rest(data: any, isEdit: any): Observable<any> {
    const API_Endpoint = isEdit ? 'director/editSalesperson' : 'director/createSalesperson'
    return this.http.post(this.API_ROOT + API_Endpoint, data, httpOptions);
  }
  //************ FOR SALES-PERSON end ************//



  //************ FOR DASHBOARD start ************//
  getDashBoardCount(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getDashboardCount', data, httpOptions);
  }
  dashboardLogIn(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/login', data, httpOptions);
  }
  //************ FOR DASHBOARD end ************//




  //************ FOR SEGMENT start ************//
  createSegment(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'director/createSegment', data, httpOptions);
  }
  getSegmentList_rest(): Observable<any> {
    return this.http.get(this.API_ROOT + 'common/getSegmentList', httpOptions);
  }

  createSubSegment(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'director/createSubSegment', data, httpOptions)
  }
  getSubSegmentList_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getSubSegmentList', data, httpOptions)
  }

  createSubSubSegment(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'director/createSubSubSegment', data, httpOptions)
  }
  getSubSubSegmentList_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getSubSubSegmentList', data, httpOptions)
  }


  createSubSubSubSegment_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'director/createSubSubSubSegment', data, httpOptions)
  }
  getSubSubSubSegmentList_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getSubSubSubSegmentList', data, httpOptions)
  }
  //************ FOR SEGMENT end ************//



  //*************** for state list start ************//
  getStateList_rest(): Observable<any> {
    return this.http.get(this.API_ROOT + 'common/getStateList', httpOptions);
  }


  //*************** for product category list start ************//
  getPrdtCategoryList_rest(): Observable<any> {
    return this.http.get(this.API_ROOT + 'common/getProductCategoryList', httpOptions)
  }



  //*************** for mentor list start ************//
  getMentorList_rest(data :any): Observable<any>{
    return this.http.post(this.API_ROOT + 'director/getMentorList',data, httpOptions)
  }


  // ************* for create customer start **************//
  createCustomer_rest(data: any, isEdit: any): Observable<any> {
    const API_Endpoint = isEdit ? 'common/editCustomer' : 'common/createCustomer'
    return this.http.post(this.API_ROOT + API_Endpoint, data, httpOptions)
  }
  // ************* for create customer end **************//



  // ************* for customer listing start **************//
  getCustomerList_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getCustomerList', data, httpOptions)
  }
  // ************* for customer listing start **************//



  // ************* for customer list by salesperson start ***********//
  getCustomerListBySalesperson_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getCustomerListBySalesperson', data, httpOptions)
  }
  // ************* for customer list by salesperson end ************//


  //********** edit & show details for only one customer start **********//
  getCustomerDetailsById_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getCustomerDetailsById', data, httpOptions)
  }
  //********** edit & show details for only one customer end **********//



  //********** edit & show details for only one sales-persson start **********//
  getSalespersonById_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'salesperson/getSalespersonById', data, httpOptions)
  }
  //********** edit & show details for only one sales-persson END **********//



  //*********** get enquiry source list start *********//
  getEnquirySourceList_rest(): Observable<any> {
    return this.http.get(this.API_ROOT + 'common/getEnquirySourceList', httpOptions)
  }


  //********** create enquiry start **********//
  createEnquiry_rest(data: any, isEdit: any): Observable<any> {
    const apiEndPoint = isEdit ? 'common/editEnquiry' : 'common/createEnquiry'
    return this.http.post(this.API_ROOT + apiEndPoint, data, httpOptions)
  }


  //********** get enquiry list start **********//
  getEnquiryList_rest(data: any): Observable<any> {
    return this.http.post(this.API_ROOT + 'common/getEnquiryList', data, httpOptions)
  }


  //********** edit & show details for only one enquiry start **********//
  getEnquiryById_rest(data: any): Observable<any>{
    return this.http.post(this.API_ROOT + 'common/getEnquiryById', data, httpOptions)
  }






}
