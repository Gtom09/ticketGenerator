import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Only access localStorage in the browser
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      console.log('UserService: Initial isAuthenticated status:', this.isAuthenticated);
    }
  }

  register(username: string, password: string) {
    // Registration logic goes here
  }

  login(username: string, password: string): boolean {
    this.isAuthenticated = true; // Set to true after successful login
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAuthenticated', 'true');
    }
    console.log('UserService: isAuthenticated set to true after login');
    return this.isAuthenticated;
  }

  isLoggedIn(): boolean {
    console.log('UserService: Checking isLoggedIn status:', this.isAuthenticated);
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isAuthenticated');
    }
    console.log('UserService: isAuthenticated set to false after logout');
  }

  setUserDetails(details: any) {
    // Store user details as needed
    console.log('User details set:', details);
    this.isAuthenticated = true;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAuthenticated', 'true');
    }
    console.log('UserService: isAuthenticated set to true in setUserDetails');
  }
}
