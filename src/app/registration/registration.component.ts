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

  private registrationUrl = 'https://j41myv2bm7.execute-api.eu-west-2.amazonaws.com';
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
          console.log('Registration successful:', response);
          this.router.navigate(['/landing-page']);
        },
        (error) => {
          this.registrationError = 'Registration failed. Please try again.';
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      );
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
