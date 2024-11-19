import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/my-services/rest.service';
import { CommonService } from 'src/app/my-services/common.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  
  

  

  constructor(private router: Router, private rest: RestService, private common: CommonService) { }


  ngOnInit(): void {

  }

  goToReportDetails(reportNavigationType : any){
    this.router.navigate(['reportDetails'], { queryParams: { reportNavigationType: reportNavigationType }});
  }




}
