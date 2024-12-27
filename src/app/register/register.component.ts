// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

// }
import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, NgIf],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  onRegister() {
    this.loading = true;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(this.password)) {
      this.errorMessage = 'Password must be greater than 7 characters, contain at least one uppercase letter and one special character';
      this.loading = true;
      return;
    }

    const user = { username: this.username, password: this.password, role: 'user' };

    let response: any;
    this.http.post("http://localhost:8080/signup", user).subscribe(result => {
      response = result
      console.log(response);
      if (response.message === "Success") {
        this.loading = false; // Hide the spinner before showing the popup
        setTimeout(()=>alert("User registered successfully"),10);
        this.router.navigate(["/"]);
      }
      else {
        this.errorMessage = 'User already exists';
        this.loading = false;
      }
    },
      error => {
        console.error('Error registering user', error);
        this.errorMessage = 'Registration failed. Please try again.';
        this.loading = false;
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(['/']);
  }
}