import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Add this
import { StorageService } from '../services/storage.service';  // Adjust the path as necessary
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import { RouterModule, Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  // Add other properties if needed
}

interface Category {
  id: number;
  name: string;
  description: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']  // Corrected styleUrls
})
export class LandingPageComponent implements OnInit {
  @ViewChild('recommended') recommendedContainer!: ElementRef;
  @ViewChild('offers') offersContainer!: ElementRef;


  userId: string | null = null;
  email: string | null = null;
  username: string | null = null;
  firstName: string | null = null;
  lastName: string | null = null;

  featuredProducts: Product[] = [];
  categories: Category[] = [];

  recommendedProducts = [
    { name: 'Product 1', img: 'assets/mock/products/product1.jpg' },
    { name: 'Product 2', img: 'assets/mock/products/product2.jpg' },
    { name: 'Product 3', img: 'assets/mock/products/product3.jpg' },
    { name: 'Product 4', img: 'assets/mock/products/product4.jpg' },
    { name: 'Product 5', img: 'assets/mock/products/product1.jpg' },
    { name: 'Product 6', img: 'assets/mock/products/product2.jpg' },
    { name: 'Product 4', img: 'assets/mock/products/product3.jpg' }
  ];

  offerProducts = [
    { name: 'Offer Product 1', img: 'assets/mock/products/product1.jpg' },
    { name: 'Offer Product 2', img: 'assets/mock/products/product2.jpg' },
    { name: 'Offer Product 3', img: 'assets/mock/products/product3.jpg' },
    { name: 'Offer Product 4', img: 'assets/mock/products/product4.jpg' },
    { name: 'Offer Product 1', img: 'assets/mock/products/product1.jpg' },
    { name: 'Offer Product 2', img: 'assets/mock/products/product2.jpg' },
    { name: 'Offer Product 3', img: 'assets/mock/products/product3.jpg' },
    { name: 'Offer Product 4', img: 'assets/mock/products/product4.jpg' },
 
  ];
  constructor(private http: HttpClient, private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.fetchUserData();
    this.fetchMockData();
   
    // console.log("validate session"+this.userId);
    // if(!this.userId ){
    //   console.log("inside ");
    //   this.router.navigate(['/login']);
    // }
  }

  scrollLeft(section: string): void {
    const container = section === 'recommended' ? this.recommendedContainer.nativeElement : this.offersContainer.nativeElement;
    container.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(section: string): void {
    const container = section === 'recommended' ? this.recommendedContainer.nativeElement : this.offersContainer.nativeElement;
    container.scrollBy({ left: 200, behavior: 'smooth' });
  }
  

  // fetchUserData(): void {
  //   this.userId = this.storageService.getSessionItem('userId');
  //   this.email = this.storageService.getSessionItem('email');
  //   this.username = this.storageService.getSessionItem('username');
  //   this.firstName = this.storageService.getSessionItem('firstName');
  //   this.lastName = this.storageService.getSessionItem('lastName');
  //   console.log("landing pageeee");
  //   console.log(this.userId);
  //   if (!this.userId) {
  //     console.error('User ID not found in session storage.');
  //   }
  //   // You can log or use these variables as needed
  // }

  fetchMockData(): void {
    this.http.get<any>('/assets/mock/mock-data.json').subscribe(
      (data) => {
        this.featuredProducts = data.featuredProducts;
        this.categories = data.categories;
      },
      (error) => {
        console.error('Error loading mock data', error);
      }
    );
  }

  fetchFeaturedProducts(): void {
    this.http.get<Product[]>('/api/featured-products').subscribe(
      (products) => this.featuredProducts = products,
      (error) => console.error('Error fetching featured products', error)
    );
  }

  fetchCategories(): void {
    this.http.get<Category[]>('/api/categories').subscribe(
      (categories) => this.categories = categories,
      (error) => console.error('Error fetching categories', error)
    );
  }

  addToCart(product: Product): void {
    console.log('Product added to cart:', product);
    this.http.post('/api/cart', { productId: product.id }).subscribe(
      response => console.log('Added to cart successfully', response),
      error => console.error('Error adding to cart', error)
    );
  }
}
