import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import {  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { SearchResultsService } from '../search-results/search-results.service';
// import { SearchService } from '../search-results/search-results.service';  // Import the SearchService
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{

  searchQuery: string = '';
  results: any = [];
  errorMessage: string = '';  // To store the error message

  constructor(private router: ActivatedRoute,// Router,
    private searchService: SearchResultsService  // Inject the service

  ) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.performSearch();
    });
  }
  // ng generate service login/login 
  // ng generate service search-results/search-results 

  getAverageRating(reviews: any[]): number {
    if (!reviews.length) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / reviews.length).toFixed(1));  // Ensure the return type is a number
  }
  
  isLoading: boolean = false;
  performSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchService.search(this.searchQuery).subscribe(
        (data) => {
          this.results = data.map((category: any) => ({
            ...category,
            products: category.products.map((product: any) => ({
              ...product,
              quantity: 1 // Initialize quantity to 1 for each product
            }))
          }));
          this.errorMessage = '';
        },
        (error) => {
          this.results = [];
          this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
        }
      );
    }
  }
  // addToCart(product: any): void {
  //   const quantity = product.quantity;
  //   console.log(`Adding ${quantity} of ${product.name} to the cart.`);
  //   // Implement your add to cart logic here
  // }
  
performSearchv1(): void {
  if (this.searchQuery.trim()) {
    this.isLoading = true;
    this.searchService.search(this.searchQuery).subscribe(
      (data) => {
        this.results = data;
        this.errorMessage = '';  // Clear any previous error message
        this.isLoading = false;
      },
      (error) => {
        this.results = [];  // Clear any previous results
        this.isLoading = false;
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;  // Set the error message
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}

addToCart(product: any): void {
  const userId = localStorage.getItem('userId'); // Retrieve the user ID from localStorage
  const productId = product.productId;
  const quantity = product.quantity;

  if (userId) {
    // Call the service to add the item to the cart
    this.searchService.addToCart(userId, productId, quantity).subscribe(
      response => {
        console.log('Product added to cart:', response);
        // Handle success (e.g., show a notification)
      },
      error => {
        console.error('Error adding product to cart:', error);
        // Handle error (e.g., show an error message)
      }
    );
  } else {
    console.error('User ID not found in localStorage');
    // Handle the case where the user ID is not available, e.g., redirect to login
  }
}
  performSearchOld(): void {
    if (this.searchQuery.trim()) {
      this.searchService.search(this.searchQuery).subscribe(
        (data) => {
          console.log("print data");
          console.log(data);
          this.results = data;
        },
        (error) => {
          console.error('Error fetching data', error);
          // this.results = null;
          this.results = [];  // Clear any previous results
          if (error.error && error.error.message) {
            this.errorMessage = error.error.message;  // Set the error message
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
    }
  }
}
