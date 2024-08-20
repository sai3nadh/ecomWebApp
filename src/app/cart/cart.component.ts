import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; // Correct path to NavbarComponent
import {  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule to use ngModel
import { SearchResultsService } from '../search-results/search-results.service';
// import { SearchService } from '../search-results/search-results.service';  // Import the SearchService
import { CommonModule } from '@angular/common';  // Import CommonModule
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { CartService } from './cart.service';
// import { ProductService } from '../product-detail/product-detail.service'; // Assuming this service exists
import { ProductDetailService } from '../product-detail/product-detail.service';  // Update the path as needed
import { Observable } from 'rxjs';

export interface CartItem {
  cartItemId: number;
  productId: number;
  quantity: number;
}

export interface Cart {
  cartId: number;
  userId: number;
  cartItems: CartItem[];
}


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [CartService]  // Add this if CartService is not provided globally

})

export class CartComponent implements OnInit {
  cart: any;
  productDetails: any[] = [];
  showCheckoutModal = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private cartService: CartService,
    private productService: ProductDetailService
  ) {}

  ngOnInit(): void {
    const userId = this.storageService.getLocalVariable('userId');
    this.cartService.getCartByUserId(userId).subscribe(
      (data: Cart) => {
        this.cart = data;
        const productIds = this.cart.cartItems.map((item: CartItem) => item.productId);
        this.getProductDetails(productIds);
      },
      (error) => {
        if (error.status === 404 && error.error.message.includes('Cart not found')) {
          this.cart = null;
        } else {
          console.error('Error fetching cart data:', error);
        }
      }
    );
  }

  getProductDetails(productIds: number[]): void {
    productIds.forEach(productId => {
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.productDetails.push(product);
        },
        (error) => {
          console.error(`Error fetching product details for product ID ${productId}:`, error);
        }
      );
    });
  }

  openCheckoutModal(): void {
    this.showCheckoutModal = true;
  }

  cancelCheckout(): void {
    this.showCheckoutModal = false;
  }

  placeOrder(): void {
    const userId = this.storageService.getLocalVariable('userId');
    const orderData = {
      userId: userId,
      customerName: this.storageService.getLocalVariable('firstName')+' '+this.storageService.getLocalVariable('firstName'),// 'John Doe', // This should ideally be fetched from user data
      customerEmail: this.storageService.getLocalVariable('email'),// 'johndoe@example.com', // This should ideally be fetched from user data
      totalAmount: this.calculateTotalAmount(),
      orderItems: this.cart.cartItems.map((item: CartItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: this.getProductPrice(item.productId)
      }))
    };

    this.createOrder(orderData).subscribe(
      (      response: any) => {
        console.log('Order placed successfully:', response);
        this.deleteCart(userId);
      },
      (      error: any) => {
        console.error('Error placing order:', error);
      }
    );
  }

  createOrder(orderData: any): Observable<any> {
    const url = 'http://localhost:8085/api/orders/createOrder';
    return this.http.post(url, orderData);
  }

  deleteCart(userId: string): void {
    this.cartService.deleteCart( Number( userId)).subscribe(
      () => {
        console.log('Cart deleted successfully.');
        alert('Order placed successfully and cart deleted.');
        this.cart = null;  // Clear the cart from the view
        this.router.navigate(['/']);  // Redirect to home or another page
      },
      error => {
        console.error('Error deleting cart:', error);
      }
    );
  }

  calculateTotalAmount(): number {
    return this.cart.cartItems.reduce((total: number, item: CartItem) => {
      const price = this.getProductPrice(item.productId);
      return total + (item.quantity * price);
    }, 0);
  }

  getProductPrice(productId: number): number {
    const product = this.productDetails.find(p => p.productId === productId);
    return product ? product.price : 0;
  }
}
