import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service'; // Adjust the path as needed
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  categories: any[] = [];
  profileLinks: any[] = []; // Assuming you have this from another endpoint or static
  userId: any;
  searchQuery: string = '';


  constructor(private navService: NavbarService, private router: Router
    , private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.navService.getCategories().subscribe(data => {
      this.categories = data;
    });
    console.log('calling here')
    // this.userId = this.storageService.getSessionItem('userId');
    console.log("uer id "+this.userId)
    if(!this.userId ){
      console.log("inside ");
      // alert('You don\'t have valid Active session. Please login again!!' )
      // this.router.navigate(['/login']);
    }
  }
  onSearch(query: string) {
    if (query) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }
  getCategoryLink(id: number): string {
    return `/categories/${id}`; // Adjust this based on your routing setup
  }
  signOut() {
    // Clear all session storage variables
    sessionStorage.clear();
    // Navigate to the login page
    
    this.router.navigate(['/login']);
  }
  
}
