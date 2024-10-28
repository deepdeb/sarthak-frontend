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
  active: boolean = true;
  comp_pro_up: boolean = true;
  imp_doc_up: boolean = false;
  princi_house_up: boolean = false;
  new_comp_entry: boolean = false;

  comp_pro_down: boolean = true;
  imp_doc_down: boolean = false;
  princi_house_down: boolean = false;
  new_comp_show: boolean = false
  

  company_profile_up(){
    this.active =  true;
    this.comp_pro_up =  true;
    this.imp_doc_up = false;
    this.princi_house_up = false;
    this.new_comp_entry = false;
  }

  important_documents_up(){
    this.comp_pro_up =  false;
    this.imp_doc_up = true;
    this.princi_house_up = false;
    this.new_comp_entry = false;
  }

  principal_house_up(){
    this.comp_pro_up =  false;
    this.imp_doc_up = false;
    this.princi_house_up = true;
    this.new_comp_entry = false;
  } 

  new_company_entry(){
    this.comp_pro_up =  false;
    this.imp_doc_up = false;
    this.princi_house_up = false;
    this.new_comp_entry = true;
  }




  company_profile_down(){
    this.comp_pro_down =  true;
    this.imp_doc_down = false;
    this.princi_house_down = false;
    this.new_comp_show = false;
  }

  important_documents_down(){
    this.comp_pro_down =  false;
    this.imp_doc_down = true;
    this.princi_house_down = false;
    this.new_comp_show = false;
  }

  principal_house_down(){
    this.comp_pro_down =  false;
    this.imp_doc_down = false;
    this.princi_house_down = true;
    this.new_comp_show = false;
  } 
  
  new_company_show(){
    this.comp_pro_down =  false;
    this.imp_doc_down = false;
    this.princi_house_down = false;
    this.new_comp_show = true;
  }
  
  constructor(private router: Router, private rest: RestService, private common:CommonService){}
  ngOnInit(): void{

  }
}
