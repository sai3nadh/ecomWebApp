import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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


@Injectable({
  providedIn: 'root'
})

export class CartService {

  private apiUrl = 'http://localhost:8086/api/carts';
  
  constructor(private http: HttpClient) { }

  // getCartByUserId(userId: number): Observable<any> {
  //   const url = `${this.apiUrl}/${userId}`;
  //   return this.http.get(url);
  // }
  getCartByUserId(userId: number): Observable<Cart> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Cart>(url);
  }

  deleteCart(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }
}
