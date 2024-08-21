import { Component, OnInit } from '@angular/core';
import { ProfileService, UserProfile } from './profile.service';
import { StorageService } from '../services/storage.service';
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    const userId = Number(this.storageService.getLocalVariable('userId'));
    this.profileService.getUserProfile(userId).subscribe(
      (profile: UserProfile) => {
        this.userProfile = profile;
        console.log('User Profile:', this.userProfile);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
