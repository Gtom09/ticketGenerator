import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated = false;

  constructor() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    console.log('UserService: Initial isAuthenticated status:', this.isAuthenticated);
  }

  register(username: string, password: string) {
   
  }

  login(username: string, password: string): boolean {
    this.isAuthenticated = true; // Set to true after successful login
    localStorage.setItem('isAuthenticated', 'true');
    console.log('UserService: isAuthenticated set to true after login');
    return this.isAuthenticated;
  }

  isLoggedIn(): boolean {
    console.log('UserService: Checking isLoggedIn status:', this.isAuthenticated);
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    console.log('UserService: isAuthenticated set to false after logout');
  }

  // Add this method
  setUserDetails(details: any) {
    // Store user details as needed
    console.log('User details set:', details);
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');
    console.log('UserService: isAuthenticated set to true in setUserDetails');
  }
}