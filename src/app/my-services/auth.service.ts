import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean {
    try {
      const userId = sessionStorage.getItem('sales_person_id');
      return userId ? true : false;
    }
    catch (error) {
      return false;
    }
  }
}
