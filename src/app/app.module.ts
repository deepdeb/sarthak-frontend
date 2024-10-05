import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './my-components/header/header.component';
import { LoginComponent } from './my-components/login/login.component';
import { DashboardComponent } from './my-components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CompanyMasterComponent } from './my-components/company-master/company-master.component';
import { DoctorMasterComponent } from './my-components/doctor-master/doctor-master.component';
import { MatTableModule } from '@angular/material/table';
import { EditModalComponent } from './my-components/edit-modal/edit-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CustomerComponent } from './my-components/customer/customer.component';
import { SalesPersonComponent } from './my-components/sales-person/sales-person.component';
import { SegmentComponent } from './my-components/segment/segment.component';
import { EnquiriesComponent } from './my-components/enquiries/enquiries.component';
import { OrdersComponent } from './my-components/orders/orders.component';
import { PresentationComponent } from './my-components/presentation/presentation.component';
import { ReportsComponent } from './my-components/reports/reports.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsPageComponent } from './my-components/details-page/details-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    CompanyMasterComponent,
    DoctorMasterComponent,
    EditModalComponent,
    CustomerComponent,
    SalesPersonComponent,
    SegmentComponent,
    EnquiriesComponent,
    OrdersComponent,
    PresentationComponent,
    ReportsComponent,
    DetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
