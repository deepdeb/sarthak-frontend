import { Injectable, inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';




@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private _snackBar = inject(MatSnackBar);
   succContent = 'Ok';
   errContent = 'Error';
  private duration = 4000;
  

  showAlertMessage(message: string, action: string) {
    this._snackBar.open(message, action, {verticalPosition:"top", duration: this.duration});
    return
  }

  constructor() { }
}
