import { Component } from '@angular/core';

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [],
//   templateUrl: './registration.component.html',
//   styleUrl: './registration.component.css'
// })
// export class RegistrationComponent {

// }

// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  registrationError: string = '';

  private registrationUrl = environment.apiUrl+ 'api/users/register';//'https://j41myv2bm7.execute-api.eu-west-2.amazonaws.com';
  //  'http://localhost:8084/api/users/register'; // Your API endpoint

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const registrationPayload = {
      username: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    if (!this.email || !this.firstName || !this.lastName || !this.password) {
      this.registrationError = 'All fields are required.';
      alert(this.registrationError);
      return;
    }
    // Example for email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(this.email)) {
    this.registrationError = 'Please enter a valid email address.';
    alert(this.registrationError);
    return;
  }

  // Example for password validation (at least 6 characters)
  if (this.password.length < 6) {
    this.registrationError = 'Password must be at least 6 characters long.';
    alert(this.registrationError);
    return;
  }
  this.http.post(this.registrationUrl, registrationPayload, { responseType: 'text' })
  .subscribe(
    (response: any) => {
      if (response && response.userId) {
        console.log('Registration successful for user:', response.username);
        alert('Registration successful! Please log in to continue.');
        this.router.navigate(['/login']);
      } else {
        this.registrationError = 'Registration failed. Unexpected response.';
        console.error('Unexpected response:', response);
        alert(this.registrationError);
      }
    },
    (error) => {
      if (error.status === 400) {

        let errorMessage: string;
        try {

          const parsedError = JSON.parse(error.error);
          errorMessage = parsedError?.message || 'Unknown error occurred.';
        } catch (e) {
          errorMessage = 'Unknown error occurred while parsing error response.';
        }

        if (errorMessage === 'Email already exists') {
          this.registrationError = 'Registration failed: The email address is already in use. Please use a different email or log in if you already have an account.';
        } else {
          this.registrationError = 'Registration failed. Error: ' + errorMessage;
        }

        alert(this.registrationError);
      } else {
        this.registrationError = 'Registration failed. Please check your network connection or try again later.';
        console.error('Registration failed:', error);
        alert(this.registrationError);
      }
    }
  );


  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
