import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private _snackBar = inject(MatSnackBar);
   succContent = 'Ok';
   errContent = 'Error';
  private duration = 4000;

  API_ROOT = this.rest.API_ROOT
  filePath = this.API_ROOT + 'upload/files/';

  showAlertMessage(message: string, action: string) {
    this._snackBar.open(message, action, {verticalPosition:"top", horizontalPosition: "center", duration: this.duration});
    return
  }

  constructor(private rest : RestService) { }
}
