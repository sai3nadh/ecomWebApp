import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service'; 
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
  profileLinks: any[] = []; 
  userId: any;
  searchQuery: string = '';


  constructor(private navService: NavbarService, private router: Router
    , private storageService: StorageService
  ) { }

  ngOnInit(): void {
    const storedUserId = this.storageService.getLocalVariable('userId');
    if (!storedUserId) {
      alert('Please login to continue shopping..');
      console.log('Please login to continue shopping..');
      this.router.navigate(['/login']);
    }
    this.navService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  stayOnPage(event: Event) {
    event.preventDefault();
  }
  onSearch(query: string) {
    if (this.searchQuery.trim()) {
      console.log('calledddd');
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }
  getCategoryLink(id: number): string {
    return `/categories/${id}`; 
  }
  onCategoryClick(categoryName: string): void {
    // Navigate to the search page with the category name as the query parameter
    this.router.navigate(['/search'], { queryParams: { query: categoryName } });
  }
  cartLink() {
    
    this.router.navigate(['/cart']);
  }
  signOut() {
    // Clear all session storage variables
    sessionStorage.clear();
    // Navigate to the login page
    sessionStorage.clear();
    this.storageService.clearAllLocalVariables();
    this.storageService.clearSession();
    this.router.navigate(['/login']);
  }
}
