import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  checkSbuId: any = sessionStorage.getItem('sbu_id');
  sbuId: any = sessionStorage.getItem('sbu_id');
  sbuIdForList: number = 0;
  isFileDiv: boolean = true;
  SBUList: any = [];

  FileOrg: any;
  products_upload: any = [];
  projects_upload: any = [];
  incorporation_upload: any = [];
  moa_upload: any = [];
  aoa_upload: any = [];
  trade_licence_upload: any = [];
  admin_licence_upload: any = [];
  electrical_licence_upload: any = [];
  bank_details_upload: any = [];
  cancelled_cheque_upload: any = [];
  balance_sheet_upload: any = [];
  pan_upload: any = [];
  tan_upload: any = [];
  gst_upload: any = [];
  iso_upload: any = [];
  msme_upload: any = [];
  presentation_upload: any = [];
  credentials_upload: any = [];


  products_upload_2: any = [];
  projects_upload_2: any = [];
  incorporation_upload_2: any = [];
  moa_upload_2: any = [];
  aoa_upload_2: any = [];
  trade_licence_upload_2: any = [];
  admin_licence_upload_2: any = [];
  electrical_licence_upload_2: any = [];
  bank_details_upload_2: any = [];
  cancelled_cheque_upload_2: any = [];
  balance_sheet_upload_2: any = [];
  pan_upload_2: any = [];
  tan_upload_2: any = [];
  gst_upload_2: any = [];
  iso_upload_2: any = [];
  msme_upload_2: any = [];
  presentation_upload_2: any = [];
  credentials_upload_2: any = [];


  filePath: any = this.common.filePath;

  comp_pro_up: boolean = true;
  imp_doc_up: boolean = false;
  princi_house_up: boolean = false;
  new_comp_entry: boolean = false;

  comp_pro_down: boolean = true;
  imp_doc_down: boolean = false;
  princi_house_down: boolean = false;
  new_comp_show: boolean = false

  activeLinkUp: string = 'company_profile_up'
  activeLinkDown: string = 'company_profile_down'

  deleteId: string = ''
  deleteType: string = ''
  removeFlag: boolean = false;

  @ViewChild('deleteFileModal') deleteFileModal: any;

  company_profile_up() {
    this.activeLinkUp = 'company_profile_up'
    this.comp_pro_up = true;
    this.imp_doc_up = false;
    this.princi_house_up = false;
    this.new_comp_entry = false;
  }

  important_documents_up() {
    this.activeLinkUp = 'important_documents_up'
    this.comp_pro_up = false;
    this.imp_doc_up = true;
    this.princi_house_up = false;
    this.new_comp_entry = false;
  }

  principal_house_up() {
    this.activeLinkUp = 'principal_house_up'
    this.comp_pro_up = false;
    this.imp_doc_up = false;
    this.princi_house_up = true;
    this.new_comp_entry = false;
  }

  company_profile_down() {
    this.activeLinkDown = 'company_profile_down'
    this.comp_pro_down = true;
    this.imp_doc_down = false;
    this.princi_house_down = false;
    this.new_comp_show = false;
  }

  important_documents_down() {
    this.activeLinkDown = 'important_documents_down'
    this.comp_pro_down = false;
    this.imp_doc_down = true;
    this.princi_house_down = false;
    this.new_comp_show = false;
  }

  principal_house_down() {
    this.activeLinkDown = 'principal_house_down'
    this.comp_pro_down = false;
    this.imp_doc_down = false;
    this.princi_house_down = true;
    this.new_comp_show = false;
  }


  constructor(private router: Router, private rest: RestService, private common: CommonService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getSBUList();
  }


  // ************* get SBU List start **************//
  getSBUList() {
    this.SBUList = [];
    const data = {
      sbu_id: this.sbuId
    }
    this.rest.getSBUList_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          if (res.response.length > 0) {
            this.SBUList = res.response;
          }
        }
      }
    })
  }
  // ************* get SBU List end **************//


  //*********** file upload function start ***********//
  fileUpload(event: any, type: 'products' | 'projects' | 'incorporation' | 'moa' | 'aoa' | 'trade_licence' | 'admin_licence' | 'electrical_licence' | 'bank_details' | 'cancelled_cheque' | 'balance_sheet' | 'pan' | 'tan' | 'gst' | 'iso' | 'msme' | 'presentation' | 'credentials') {
    this.FileOrg = event.target.files;
    if (this.FileOrg) {
      const formData = new FormData();

      for (let i = 0; i < this.FileOrg.length; i++) {
        const file = this.FileOrg[i];
        formData.append('files[]', file, file.name);
      }

      this.rest.multipleDocumentUpload_rest(formData).subscribe((res: any) => {
        if (res.success) {
          if (type == 'products') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.products_upload = this.products_upload ? this.products_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'projects') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.projects_upload = this.projects_upload ? this.projects_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'incorporation') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.incorporation_upload = this.incorporation_upload ? this.incorporation_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'moa') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.moa_upload = this.moa_upload ? this.moa_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'aoa') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.aoa_upload = this.aoa_upload ? this.aoa_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'trade_licence') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.trade_licence_upload = this.trade_licence_upload ? this.trade_licence_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'admin_licence') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.admin_licence_upload = this.admin_licence_upload ? this.admin_licence_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'electrical_licence') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.electrical_licence_upload = this.electrical_licence_upload ? this.electrical_licence_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'bank_details') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.bank_details_upload = this.bank_details_upload ? this.bank_details_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'cancelled_cheque') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.cancelled_cheque_upload = this.cancelled_cheque_upload ? this.cancelled_cheque_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'balance_sheet') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.balance_sheet_upload = this.balance_sheet_upload ? this.balance_sheet_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'pan') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.pan_upload = this.pan_upload ? this.pan_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'tan') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.tan_upload = this.tan_upload ? this.tan_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'gst') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.gst_upload = this.gst_upload ? this.gst_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'iso') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.iso_upload = this.iso_upload ? this.iso_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'msme') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.msme_upload = this.msme_upload ? this.msme_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'presentation') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.presentation_upload = this.presentation_upload ? this.presentation_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          } else if (type == 'credentials') {
            let tempAssignmentDocAll: string[] = [];
            for (var i = 0; i < res.response.length; i++) {
              tempAssignmentDocAll.push(res.response[i].newFileName);
            }
            this.credentials_upload = this.credentials_upload ? this.credentials_upload.concat(tempAssignmentDocAll) : tempAssignmentDocAll;
          }
        }
      })
    }
  }

  //******** submit documents in presentation ********//
  presentationDocumentUpload() {
    let tempProductDocs = this.products_upload.length > 0 ? this.products_upload.join(',') : '';
    let tempProjectDocs = this.projects_upload.length > 0 ? this.projects_upload.join(',') : '';
    let tempIncorporationDocs = this.incorporation_upload.length > 0 ? this.incorporation_upload.join(',') : '';
    let tempMoaDocs = this.moa_upload.length > 0 ? this.moa_upload.join(',') : '';
    let tempAoaDocs = this.aoa_upload.length > 0 ? this.aoa_upload.join(',') : '';
    let tempTradeLicenceDocs = this.trade_licence_upload.length > 0 ? this.trade_licence_upload.join(',') : '';
    let tempAdminLicenceDocs = this.admin_licence_upload.length > 0 ? this.admin_licence_upload.join(',') : '';
    let tempElectricalLicenceDocs = this.electrical_licence_upload.length > 0 ? this.electrical_licence_upload.join(',') : '';
    let tempBankDetailsDocs = this.bank_details_upload.length > 0 ? this.bank_details_upload.join(',') : '';
    let tempCancelledChequeDocs = this.cancelled_cheque_upload.length > 0 ? this.cancelled_cheque_upload.join(',') : '';
    let tempBalanceSheetDocs = this.balance_sheet_upload.length > 0 ? this.balance_sheet_upload.join(',') : '';
    let tempPanDocs = this.pan_upload.length > 0 ? this.pan_upload.join(',') : '';
    let tempTanDocs = this.tan_upload.length > 0 ? this.tan_upload.join(',') : '';
    let tempGstDocs = this.gst_upload.length > 0 ? this.gst_upload.join(',') : '';
    let tempIsoDocs = this.iso_upload.length > 0 ? this.iso_upload.join(',') : '';
    let tempMsmeDocs = this.msme_upload.length > 0 ? this.msme_upload.join(',') : '';
    let tempPresentationDocs = this.presentation_upload.length > 0 ? this.presentation_upload.join(',') : '';
    let tempCredentialDocs = this.credentials_upload.length > 0 ? this.credentials_upload.join(',') : '';

    const data = {
      sbu_id: this.sbuId,
      product_file: tempProductDocs,
      project_file: tempProjectDocs,
      incorporation_cert_file: tempIncorporationDocs,
      moa_file: tempMoaDocs,
      aoa_file: tempAoaDocs,
      trade_license_file: tempTradeLicenceDocs,
      admin_license_file: tempAdminLicenceDocs,
      electrical_contractor_license: tempElectricalLicenceDocs,
      bank_details_file: tempBankDetailsDocs,
      cancelled_cheque_file: tempCancelledChequeDocs,
      balance_sheets_file: tempBalanceSheetDocs,
      pan_card_file: tempPanDocs,
      tan_file: tempTanDocs,
      gst_cert_file: tempGstDocs,
      iso_cert_file: tempIsoDocs,
      msme_udyam_cert: tempMsmeDocs,
      presentation_file: tempPresentationDocs,
      credential_file: tempCredentialDocs,
    }
    this.rest.presentationDocumentUpload_rest(data).subscribe((res: any) => {
      if (res.success) {
        if(this.removeFlag) {
          this.common.showAlertMessage('File deleted successfully', this.common.succContent);
        } else {
          this.common.showAlertMessage(res.message, this.common.succContent);
        }
        this.products_upload = [];
        this.projects_upload = [];
        this.incorporation_upload = [];
        this.moa_upload = [];
        this.aoa_upload = [];
        this.trade_licence_upload = [];
        this.admin_licence_upload = [];
        this.electrical_licence_upload = [];
        this.bank_details_upload = [];
        this.cancelled_cheque_upload = [];
        this.balance_sheet_upload = [];
        this.pan_upload = [];
        this.tan_upload = [];
        this.gst_upload = [];
        this.iso_upload = [];
        this.msme_upload = [];
        this.presentation_upload = [];
        this.credentials_upload = [];
        this.sbuId = 0;
        this.removeFlag = false;
      }
    })
  }



    //******** submit documents in presentation ********//
    presentationDocumentUploadAfterRemove() {
      let tempProductDocs = this.products_upload.length > 0 ? this.products_upload.join(',') : '';
      let tempProjectDocs = this.projects_upload.length > 0 ? this.projects_upload.join(',') : '';
      let tempIncorporationDocs = this.incorporation_upload.length > 0 ? this.incorporation_upload.join(',') : '';
      let tempMoaDocs = this.moa_upload.length > 0 ? this.moa_upload.join(',') : '';
      let tempAoaDocs = this.aoa_upload.length > 0 ? this.aoa_upload.join(',') : '';
      let tempTradeLicenceDocs = this.trade_licence_upload.length > 0 ? this.trade_licence_upload.join(',') : '';
      let tempAdminLicenceDocs = this.admin_licence_upload.length > 0 ? this.admin_licence_upload.join(',') : '';
      let tempElectricalLicenceDocs = this.electrical_licence_upload.length > 0 ? this.electrical_licence_upload.join(',') : '';
      let tempBankDetailsDocs = this.bank_details_upload.length > 0 ? this.bank_details_upload.join(',') : '';
      let tempCancelledChequeDocs = this.cancelled_cheque_upload.length > 0 ? this.cancelled_cheque_upload.join(',') : '';
      let tempBalanceSheetDocs = this.balance_sheet_upload.length > 0 ? this.balance_sheet_upload.join(',') : '';
      let tempPanDocs = this.pan_upload.length > 0 ? this.pan_upload.join(',') : '';
      let tempTanDocs = this.tan_upload.length > 0 ? this.tan_upload.join(',') : '';
      let tempGstDocs = this.gst_upload.length > 0 ? this.gst_upload.join(',') : '';
      let tempIsoDocs = this.iso_upload.length > 0 ? this.iso_upload.join(',') : '';
      let tempMsmeDocs = this.msme_upload.length > 0 ? this.msme_upload.join(',') : '';
      let tempPresentationDocs = this.presentation_upload.length > 0 ? this.presentation_upload.join(',') : '';
      let tempCredentialDocs = this.credentials_upload.length > 0 ? this.credentials_upload.join(',') : '';
  
      const data = {
        sbu_id: this.sbuId,
        product_file: tempProductDocs,
        project_file: tempProjectDocs,
        incorporation_cert_file: tempIncorporationDocs,
        moa_file: tempMoaDocs,
        aoa_file: tempAoaDocs,
        trade_license_file: tempTradeLicenceDocs,
        admin_license_file: tempAdminLicenceDocs,
        electrical_contractor_license: tempElectricalLicenceDocs,
        bank_details_file: tempBankDetailsDocs,
        cancelled_cheque_file: tempCancelledChequeDocs,
        balance_sheets_file: tempBalanceSheetDocs,
        pan_card_file: tempPanDocs,
        tan_file: tempTanDocs,
        gst_cert_file: tempGstDocs,
        iso_cert_file: tempIsoDocs,
        msme_udyam_cert: tempMsmeDocs,
        presentation_file: tempPresentationDocs,
        credential_file: tempCredentialDocs,
      }
      this.rest.presentationDocumentUpload_rest(data).subscribe((res: any) => {
        if (res.success) {
          this.common.showAlertMessage(res.message, this.common.succContent);
          // this.products_upload = [];
          // this.projects_upload = [];
          // this.incorporation_upload = [];
          // this.moa_upload = [];
          // this.aoa_upload = [];
          // this.trade_licence_upload = [];
          // this.admin_licence_upload = [];
          // this.electrical_licence_upload = [];
          // this.bank_details_upload = [];
          // this.cancelled_cheque_upload = [];
          // this.balance_sheet_upload = [];
          // this.pan_upload = [];
          // this.tan_upload = [];
          // this.gst_upload = [];
          // this.iso_upload = [];
          // this.msme_upload = [];
          // this.presentation_upload = [];
          // this.credentials_upload = [];
        }
      })
    }




  // show documents //
  getCompanyDocDetailsById() {
    this.sbuIdForList = 0;
    this.products_upload = [];
    this.projects_upload = [];
    this.incorporation_upload = [];
    this.moa_upload = [];
    this.aoa_upload = [];
    this.trade_licence_upload = [];
    this.admin_licence_upload = [];
    this.electrical_licence_upload = [];
    this.bank_details_upload = [];
    this.cancelled_cheque_upload = [];
    this.balance_sheet_upload = [];
    this.pan_upload = [];
    this.tan_upload = [];
    this.gst_upload = [];
    this.iso_upload = [];
    this.msme_upload = [];
    this.presentation_upload = [];
    this.credentials_upload = [];
    const data = {
      sbu_id: this.sbuId
    }
    this.rest.getCompanyDocDetailsById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.products_upload = res.response[0].product_file ? res.response[0].product_file.split(',') : [];
          this.projects_upload = res.response[0].project_file ? res.response[0].project_file.split(',') : [];
          this.incorporation_upload = res.response[0].incorporation_cert_file ? res.response[0].incorporation_cert_file.split(',') : [];
          this.moa_upload = res.response[0].moa_file ? res.response[0].moa_file.split(',') : [];
          this.aoa_upload = res.response[0].aoa_file ? res.response[0].aoa_file.split(',') : [];
          this.trade_licence_upload = res.response[0].trade_license_file ? res.response[0].trade_license_file.split(',') : [];
          this.admin_licence_upload = res.response[0].admin_license_file ? res.response[0].admin_license_file.split(',') : [];
          this.electrical_licence_upload = res.response[0].electrical_contractor_license ? res.response[0].electrical_contractor_license.split(',') : [];
          this.bank_details_upload = res.response[0].bank_details_file ? res.response[0].bank_details_file.split(',') : [];
          this.cancelled_cheque_upload = res.response[0].cancelled_cheque_file ? res.response[0].cancelled_cheque_file.split(',') : [];
          this.balance_sheet_upload = res.response[0].balance_sheets_file ? res.response[0].balance_sheets_file.split(',') : [];
          this.pan_upload = res.response[0].pan_card_file ? res.response[0].pan_card_file.split(',') : [];
          this.tan_upload = res.response[0].tan_file ? res.response[0].tan_file.split(',') : [];
          this.gst_upload = res.response[0].gst_cert_file ? res.response[0].gst_cert_file.split(',') : [];
          this.iso_upload = res.response[0].iso_cert_file ? res.response[0].iso_cert_file.split(',') : [];
          this.msme_upload = res.response[0].msme_udyam_cert ? res.response[0].msme_udyam_cert.split(',') : [];
          this.presentation_upload = res.response[0].presentation_file ? res.response[0].presentation_file.split(',') : [];
          this.credentials_upload = res.response[0].credential_file ? res.response[0].credential_file.split(',') : [];
        }
      }
    })
  }


  getCompanyDocDetailsById2() {
    this.sbuId = 0;
    this.products_upload_2 = [];
    this.projects_upload_2 = [];
    this.incorporation_upload_2 = [];
    this.moa_upload_2 = [];
    this.aoa_upload_2 = [];
    this.trade_licence_upload_2 = [];
    this.admin_licence_upload_2 = [];
    this.electrical_licence_upload_2 = [];
    this.bank_details_upload_2 = [];
    this.cancelled_cheque_upload_2 = [];
    this.balance_sheet_upload_2 = [];
    this.pan_upload_2 = [];
    this.tan_upload_2 = [];
    this.gst_upload_2 = [];
    this.iso_upload_2 = [];
    this.msme_upload_2 = [];
    this.presentation_upload_2 = [];
    this.credentials_upload_2 = [];
    const data = {
      sbu_id: this.sbuIdForList
    }
    this.rest.getCompanyDocDetailsById_rest(data).subscribe((res: any) => {
      if (res.success) {
        if (res.response) {
          this.products_upload_2 = res.response[0].product_file ? res.response[0].product_file.split(',') : [];
          this.projects_upload_2 = res.response[0].project_file ? res.response[0].project_file.split(',') : [];
          this.incorporation_upload_2 = res.response[0].incorporation_cert_file ? res.response[0].incorporation_cert_file.split(',') : [];
          this.moa_upload_2 = res.response[0].moa_file ? res.response[0].moa_file.split(',') : [];
          this.aoa_upload_2 = res.response[0].aoa_file ? res.response[0].aoa_file.split(',') : [];
          this.trade_licence_upload_2 = res.response[0].trade_license_file ? res.response[0].trade_license_file.split(',') : [];
          this.admin_licence_upload_2 = res.response[0].admin_license_file ? res.response[0].admin_license_file.split(',') : [];
          this.electrical_licence_upload_2 = res.response[0].electrical_contractor_license ? res.response[0].electrical_contractor_license.split(',') : [];
          this.bank_details_upload_2 = res.response[0].bank_details_file ? res.response[0].bank_details_file.split(',') : [];
          this.cancelled_cheque_upload_2 = res.response[0].cancelled_cheque_file ? res.response[0].cancelled_cheque_file.split(',') : [];
          this.balance_sheet_upload_2 = res.response[0].balance_sheets_file ? res.response[0].balance_sheets_file.split(',') : [];
          this.pan_upload_2 = res.response[0].pan_card_file ? res.response[0].pan_card_file.split(',') : [];
          this.tan_upload_2 = res.response[0].tan_file ? res.response[0].tan_file.split(',') : [];
          this.gst_upload_2 = res.response[0].gst_cert_file ? res.response[0].gst_cert_file.split(',') : [];
          this.iso_upload_2 = res.response[0].iso_cert_file ? res.response[0].iso_cert_file.split(',') : [];
          this.msme_upload_2 = res.response[0].msme_udyam_cert ? res.response[0].msme_udyam_cert.split(',') : [];
          this.presentation_upload_2 = res.response[0].presentation_file ? res.response[0].presentation_file.split(',') : [];
          this.credentials_upload_2 = res.response[0].credential_file ? res.response[0].credential_file.split(',') : [];
        }
      }
    })
  }


  viewFile(id: any) {
    const viewFile = this.filePath + id;
    window.open(viewFile, "_blank");
  }


  removeFile() {
    this.removeFlag = true
    if (this.deleteType == 'products') {
      const removedItem = this.products_upload.splice(this.deleteId, 1)[0];
      this.presentationDocumentUpload();
      this.dialog.closeAll();
      this.unlinkSyncRemove(removedItem);
    }
    else if (this.deleteType == 'projects') {
      this.projects_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    } 
    else if (this.deleteType == 'incorporation') {
      this.incorporation_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'moa') {
      this.moa_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'aoa') {
      this.aoa_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'trade_licence') {
      this.trade_licence_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'admin_licence') {
      this.admin_licence_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'electrical_licence') {
      this.electrical_licence_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'bank_details') {
      this.bank_details_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'cancelled_cheque') {
      this.cancelled_cheque_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'balance_sheet') {
      this.balance_sheet_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'pan') {
      this.pan_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'tan') {
      this.tan_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'gst') {
      this.gst_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'iso') {
      this.iso_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'msme') {
      this.msme_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'presentation') {
      this.presentation_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
    else if (this.deleteType == 'credentials') {
      this.credentials_upload.splice(this.deleteId, 1);
      this.presentationDocumentUpload();
      this.dialog.closeAll();
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

  openModal(id: any, type: string) {
    this.deleteId = id
    this.deleteType = type
    const dialogRef = this.dialog.open(this.deleteFileModal, {
      width: '300px'
    })
    dialogRef.afterClosed().subscribe({

    });
  }

  formatName(name: any) {
    const splitName = name.split('_');
    const formattedName = splitName.slice(1).join('_')
    return formattedName;
  }

  unlinkSyncRemove(removed_item: any) {
    const data = {
      removed_item: removed_item
    }
    this.rest.unlinkSyncRemove_rest(data).subscribe((res: any) => {
      if(res.success) {
        console.log(res.message)
      } else {
        console.log(res.error)
      }
    })
  }
}
