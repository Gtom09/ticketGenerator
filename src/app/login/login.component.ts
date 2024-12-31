import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AdminService } from '../admin.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private adminService: AdminService
  ) { }

  onLogin() {
    this.loading = true;
    const user = { username: this.username, password: this.password };
    let resp: { [key: string]: any };
    this.http.get(`http://localhost:8080/users/${this.username}/${this.password}`).subscribe(
      response => {
        resp = response;
        console.log('User logged in successfully', response);
        if (resp['role'] === 'admin') {
          this.isAdmin = true;
          this.adminService.setAdminDetails(response);
          console.log('Navigating to dashboard: admin');
          this.router.navigate(['/dashboard']).then(() => {
            this.loading = false;
          });;
        } else if (resp['role'] === 'agent') {
          this.userService.setUserDetails(response);
          this.router.navigate(['/dashboard']).then(() => {
            this.loading = false;
          });;
        }
        else {
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
          this.loading = false;
        }
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        this.loading = false;
      }
    );
  }

  redirectToSignup() {
    this.router.navigate(['/register']);
  }

  redirectToForgotPassword() {
    // Your forgot password logic here
  }
}