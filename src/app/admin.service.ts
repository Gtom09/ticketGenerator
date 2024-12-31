import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private isAdminLoggedIn = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadAdminStatus();
  }

  private loadAdminStatus() {
    if (isPlatformBrowser(this.platformId)) {
      // Only access localStorage in the browser
      const storedValue = localStorage.getItem('isAdminLoggedIn');
      this.isAdminLoggedIn = storedValue === 'true';
      console.log('AdminService: Initial isAdminLoggedIn status:', this.isAdminLoggedIn);
    }
  }

  login(username: string, password: string): boolean {
    console.log('AdminService: login called');
    this.isAdminLoggedIn = true; // Set to true after successful login
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAdminLoggedIn', 'true');
    }
    console.log('AdminService: isAdminLoggedIn set to true after login');
    return this.isAdminLoggedIn;
  }

  isLoggedIn(): boolean {
    console.log('AdminService: Checking isAdminLoggedIn status:', this.isAdminLoggedIn);
    return this.isAdminLoggedIn;
  }

  logout() {
    console.log('AdminService: logout called');
    this.isAdminLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isAdminLoggedIn');
    }
    console.log('AdminService: isAdminLoggedIn set to false after logout');
  }

  setAdminDetails(details: any) {
    console.log('AdminService: setAdminDetails called with details:', details);
    this.isAdminLoggedIn = true;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAdminLoggedIn', 'true');
    }
    console.log('AdminService: isAdminLoggedIn set to true in setAdminDetails');
  }
}
