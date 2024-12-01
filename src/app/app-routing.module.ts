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
import { MyProfileComponent } from './my-components/my-profile/my-profile.component';
import { ReportDetailsComponent } from './my-components/report-details/report-details.component';
import { AddCompanyComponent } from './my-components/add-company/add-company.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '',component:LoginComponent},
  { path: 'header',component:HeaderComponent, canActivate:[AuthGuard] },
  { path: 'dashboard',component:DashboardComponent, canActivate:[AuthGuard] },
  { path: 'customer',component:CustomerComponent, canActivate:[AuthGuard] },
  { path: 'sales-person',component:SalesPersonComponent, canActivate:[AuthGuard] },
  { path: 'segment',component:SegmentComponent, canActivate:[AuthGuard]},
  { path: 'enquiries',component:EnquiriesComponent, canActivate:[AuthGuard]},
  { path: 'orders',component:OrdersComponent, canActivate:[AuthGuard] },
  { path: 'presentation',component:PresentationComponent, canActivate:[AuthGuard] },
  { path: 'reports',component:ReportsComponent, canActivate:[AuthGuard] },
  { path: 'detailsPage', component: DetailsPageComponent, canActivate:[AuthGuard] },
  { path: 'followUp', component:FollowUpComponent, canActivate:[AuthGuard] },
  { path: 'myProfile', component:MyProfileComponent, canActivate:[AuthGuard] },
  { path: 'reportDetails', component:ReportDetailsComponent, canActivate:[AuthGuard] },
  { path: 'addCompany', component:AddCompanyComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
