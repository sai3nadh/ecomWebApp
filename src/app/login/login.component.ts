import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userId: string = '';
  password: string = '';
  loginError: string = '';

  private loginUrl =  environment.apiUrl+'api/users/login';
  // 'http://localhost:8084/api/users/login'; // Your API endpoint

  constructor(private http: HttpClient, private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Check if the user is already logged in by checking localStorage for userId
    const storedUserId = this.storageService.getLocalVariable('userId');
    if (storedUserId) {
      console.log('User is already logged in, redirecting to landing page.');
      this.router.navigate(['/landing-page']);
    }
  }

  onSubmit() {
    if (!this.userId || !this.password) {
      this.loginError = 'Username and password are required.';
      return;
    }

    const loginPayload = {
      username: this.userId,
      password: this.password
    };

    this.http.post(this.loginUrl, loginPayload)
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          //  // Store user details in localStorage
          //  localStorage.setItem('userId', response.userId);
          //  localStorage.setItem('email', response.email);
          //  localStorage.setItem('username', response.username);
          //  localStorage.setItem('firstName', response.firstName);
          //  localStorage.setItem('lastName', response.lastName);
  // Store user details in sessionStorage
  console.log("login success.. ");
  console.log(response);
  console.log(response.userId);
  
  console.log("login success.. end");
  // if (this.storageService.isSessionStorageAvailable()) {
        
  //   sessionStorage.setItem('userId', response.userId);
  //   sessionStorage.setItem('email', response.email);
  //   sessionStorage.setItem('username', response.username);
  //   sessionStorage.setItem('firstName', response.firstName);
  //   sessionStorage.setItem('lastName', response.lastName);
  // }
  
        this.storageService.setLocalVariable('userId', response.userId);
        this.storageService.setLocalVariable('email', response.email);
        this.storageService.setLocalVariable('username', response.username);
        this.storageService.setLocalVariable('firstName', response.firstName);
        this.storageService.setLocalVariable('lastName', response.lastName);
        this.router.navigate(['/landing-page']);
        },
        (error) => {
          this.loginError = 'Invalid user ID or password.';
          console.error('Login failed:', error);
          alert('Login failed. Please try again.');
        }
      );
  }

  onRegister() {
    this.router.navigate(['/registration']);
  }
}
