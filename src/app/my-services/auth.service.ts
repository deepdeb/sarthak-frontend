import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  
  isAuthenticated(): boolean {
    try {
        const userId = localStorage.getItem('sales_person_id');
        return userId ? true : false;
    }
    catch (error) {
        return false;
    }
}
}
