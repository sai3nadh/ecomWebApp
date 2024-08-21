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
    this.navService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    // this.navService.getCategories().subscribe(data => {
    //   this.categories = data;
    // });
    // console.log('calling here')
    // this.printSessionValues();
    // this.userId = this.storageService.getSessionItem('userId');
    // console.log("uer id "+this.userId)
    // if(!this.userId ){
    //   console.log("inside ");
    //   alert('You don\'t have valid Active session. Please login again!!' )
    //   this.router.navigate(['/login']);
    // }
  }
  stayOnPage(event: Event) {
    event.preventDefault();
    // Perform your action here
  }
  onSearch(query: string) {
    // if (query) {
    //   console.log("enter to query")
    //   this.router.navigate(['/search'], { queryParams: { q: query } });
    // }
    if (this.searchQuery.trim()) {
      console.log('calledddd');
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }
  getCategoryLink(id: number): string {
    return `/categories/${id}`; // Adjust this based on your routing setup
  }
  onCategoryClick(categoryName: string): void {
    // Navigate to the search page with the category name as the query parameter
    this.router.navigate(['/search'], { queryParams: { query: categoryName } });
  }
  cartLink() {
    // return `/cart`; // Adjust this based on your routing setup
    this.router.navigate(['/cart']);
  }
  signOut() {
    // this.printSessionValues();
    // Clear all session storage variables
    sessionStorage.clear();
    // Navigate to the login page
    sessionStorage.clear();
    this.storageService.clearAllLocalVariables();
    this.storageService.clearSession();
    this.router.navigate(['/login']);
  }
  // printSessionValues() {
  //   // this.userId = this.storageService.getSessionItem('userId');
  //   console.log('UserId:', this.storageService.getSessionItem('userId'));
  //   console.log('Email:', this.storageService.getSessionItem('email'));
  //   console.log('Username:', this.storageService.getSessionItem('username'));
  //   console.log('FirstName:', this.storageService.getSessionItem('firstName'));
  //   console.log('LastName:', this.storageService.getSessionItem('lastName'));
  // }
}
