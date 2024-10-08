import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './my-components/login/login.component';
import { HeaderComponent } from './my-components/header/header.component';
import { DashboardComponent } from './my-components/dashboard/dashboard.component';
import { CustomerComponent } from './my-components/customer/customer.component';
import { SalesPersonComponent } from './my-components/sales-person/sales-person.component';
import { SegmentComponent } from './my-components/segment/segment.component';
import { EnquiriesComponent } from './my-components/enquiries/enquiries.component';
import { OrdersComponent } from './my-components/orders/orders.component';
import { PresentationComponent } from './my-components/presentation/presentation.component';
import { ReportsComponent } from './my-components/reports/reports.component';
import { DetailsPageComponent } from './my-components/details-page/details-page.component';
import { FollowUpComponent } from './my-components/follow-up/follow-up.component';

// import { CompanyMasterComponent } from './my-components/company-master/company-master.component';
// import { DoctorMasterComponent } from './my-components/doctor-master/doctor-master.component';



const routes: Routes = [
  { path: '',component:LoginComponent},
  { path: 'header',component:HeaderComponent },
  { path: 'dashboard',component:DashboardComponent },
  { path: 'customer',component:CustomerComponent},
  { path: 'sales-person',component:SalesPersonComponent},
  { path: 'segment',component:SegmentComponent},
  { path: 'enquiries',component:EnquiriesComponent },
  { path: 'orders',component:OrdersComponent },
  { path: 'presentation',component:PresentationComponent },
  { path: 'reports',component:ReportsComponent },
  { path: 'detailsPage', component: DetailsPageComponent },
  { path: 'followUp', component:FollowUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
