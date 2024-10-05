import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';





@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent {
  active: boolean = true;
  comp_pro_up: boolean = true;
  imp_doc_up: boolean =false;
  princi_house_up: boolean =false;

  comp_pro_down: boolean = true;
  imp_doc_down: boolean =false;
  princi_house_down: boolean =false;

  company_profile_up(){
    this.active =  true;
    this.comp_pro_up =  true;
    this.imp_doc_up = false;
    this.princi_house_up = false;
  }

  important_documents_up(){
    this.comp_pro_up =  false;
    this.imp_doc_up = true;
    this.princi_house_up = false;
  }

  principal_house_up(){
    this.comp_pro_up =  false;
    this.imp_doc_up = false;
    this.princi_house_up = true;
  } 




  company_profile_down(){
    this.comp_pro_down =  true;
    this.imp_doc_down = false;
    this.princi_house_down = false;
  }

  important_documents_down(){
    this.comp_pro_down =  false;
    this.imp_doc_down = true;
    this.princi_house_down = false;
  }

  principal_house_down(){
    this.comp_pro_down =  false;
    this.imp_doc_down = false;
    this.princi_house_down = true;
  } 
  
  
  constructor( private rest: RestService, private common:CommonService){}
  ngOnInit(): void{

  }
}
