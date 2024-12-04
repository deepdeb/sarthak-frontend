import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';





@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {

  FileOrg : any;
  products_upload: any = [];
  projects_upload: any = [];



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
  

  company_profile_up(){
    this.activeLinkUp = 'company_profile_up'
    this.comp_pro_up =  true;
    this.imp_doc_up = false;
    this.princi_house_up = false;
    this.new_comp_entry = false;
  }

  important_documents_up(){
    this.activeLinkUp = 'important_documents_up'
    this.comp_pro_up =  false;
    this.imp_doc_up = true;
    this.princi_house_up = false;
    this.new_comp_entry = false;
  }

  principal_house_up(){
    this.activeLinkUp = 'principal_house_up'
    this.comp_pro_up =  false;
    this.imp_doc_up = false;
    this.princi_house_up = true;
    this.new_comp_entry = false;
  } 

  company_profile_down(){
    this.activeLinkDown = 'company_profile_down'
    this.comp_pro_down =  true;
    this.imp_doc_down = false;
    this.princi_house_down = false;
    this.new_comp_show = false;
  }

  important_documents_down(){
    this.activeLinkDown = 'important_documents_down'
    this.comp_pro_down =  false;
    this.imp_doc_down = true;
    this.princi_house_down = false;
    this.new_comp_show = false;
  }

  principal_house_down(){
    this.activeLinkDown = 'principal_house_down'
    this.comp_pro_down =  false;
    this.imp_doc_down = false;
    this.princi_house_down = true;
    this.new_comp_show = false;
  } 

  
  constructor(private router: Router, private rest: RestService, private common:CommonService){}
  ngOnInit(): void{

  }




  //*********** file upload function start ***********//
  fileUpload(event: any, type: 'products' | 'projects'){
    this.FileOrg = event.target.files;
    if (this.FileOrg) {
      const formData = new FormData();
     
      for (let i = 0; i < this.FileOrg.length; i++) {
        const file = this.FileOrg[i];
        formData.append('files[]', file, file.name);
      }

      this.rest.multipleDocumentUpload_rest(formData).subscribe((res:any) => {
        if (res.success) {
          this.common.showAlertMessage(res.message, this.common.succContent);
          if(type == 'products') {
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
          }
        }
      })
    }
  }


}
