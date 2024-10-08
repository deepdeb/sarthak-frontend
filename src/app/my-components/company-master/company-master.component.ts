import { Component } from '@angular/core';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-company-master',
  templateUrl: './company-master.component.html',
  styleUrls: ['./company-master.component.css']
})
export class CompanyMasterComponent {
  displayedColumns: string[] = ['position', 'name', 'date', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  constructor(private matDialog:MatDialog){}

  openDialog(){
    this.matDialog.open(EditModalComponent,{
      width:'400px',
    })
  }
}



export interface PeriodicElement {
  name: string;
  date:string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'appolo munich', date:'10/07/2024', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'appolo munich', date:'10-07-2024', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];