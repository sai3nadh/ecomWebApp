import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import {  OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { SearchResultsService } from '../search-results/search-results.service';
import { Product, ProductDetailService } from './product-detail.service';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],

  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
//   productDetailService: any;
//   product: any;
//   constructor(private router: ActivatedRoute,// Router,
//   private searchService: SearchResultsService  // Inject the service

// ) { }
  // ngOnInit(): void {
  //   alert('cale in ngonit');
  //   const productId = this.router.snapshot.paramMap.get('id');
  //   this.productDetailService.getProductById(Number(productId)).subscribe(
  //     (data: any) => {
  //       this.product = data;
  //       alert(data+"wdfwdw");
  //       console.log('Product details:', this.product);
  //     },
  //     (error: any) => {
  //       alert(error);

  //       console.error('Error fetching product details:', error);
  //     }
  //   );
  //   // throw new Error('Method not implemented.');
  // }

  product: Product | null = null;
  errorMessage: string = '';
  // searchService: any;
  quantity: number = 1;  // Initialize quantity to 1

  constructor(
    private route: ActivatedRoute,
    private productService: ProductDetailService,
    private searchService: SearchResultsService // Injecting the service correctly
  ) {}

  // ngOnInit(): void {
  //   console.log('ffff'+this.route.snapshot.paramMap.get('productId')!);
  //   // const productId = +this.route.snapshot.paramMap.get('productId')!;
  //   const productId = +params.get('productId')!; // Use the non-null assertion operator '!' to assert that the value is not null

  //   this.fetchProductDetails(productId);
  // }
  ngOnInit(): void {
    // Ensure that the parameter name matches exactly with the one defined in your routing configuration
    this.route.paramMap.subscribe((params) => {  // params is now correctly defined as a parameter
      // const productId = +params.get('productId')!; // Use the non-null assertion operator '!' to assert that the value is not null
      const productId = +params.get('productId')!; // Use the non-null assertion operator '!' to assert that the value is not null
console.log("pring value"+ params.get('productId')!);
      // const productId = +this.route.snapshot.paramMap.get('productId')!;
    
      console.log('Product ID:', productId); // Debugging log
  
      
      console.log('Product ID:', productId); // Log the productId to debug
      if (productId) {
        this.fetchProductDetails(productId);
      } else {
        this.errorMessage = 'Product ID is invalid or not provided.';
      }
    });
  }
  addToCart(): void {
    const userId = localStorage.getItem('userId');
    const productId = this.product?.productId;
    // const quantity = this.product?.quantity;
    console.log("userId"+userId);
    console.log("procuidd"+productId);
    // console.log("qttyyy"+quantity);

    if (userId && productId && this.quantity) {
      this.searchService.addToCart(userId, productId, this.quantity).subscribe(
        (        response: any) => {
          console.log('Product added to cart:', response);
          alert('Product added to cart successfully!');
        },
        (        error: any) => {
          console.error('Error adding product to cart:', error);
          alert('Failed to add product to cart. Please try again.');
        }
      );
    } else {
      alert('Please log in to add products to your cart.');
    }
  }
  fetchProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (data: Product) => {
        this.product = data;
      },
      (error) => {
        this.errorMessage = 'Unable to load product details. Please try again later.';
        console.error('Error fetching product details:', error);
      }
    );
  }
}
