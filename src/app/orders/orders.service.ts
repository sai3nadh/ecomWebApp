import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  quantity: number;
  productId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: Image[];
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}


export interface Image {
  imageId: number;
  imageUrl: string;
  altText: string | null;
}

export interface OrderItem {
  orderItemId: number;
  product: Product;  
  quantity: number;
  price: number;
}

export interface Order {
  orderId: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  totalAmount: number;
  orderItems: OrderItem[];
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private apiUrl = 'http://localhost:8086/api/orders';
  private apiUrl = environment.apiUrl+'/api/orders/user';
  //  'http://localhost:8085/api/orders/user';

  constructor(private http: HttpClient) { }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Order[]>(url);
  }
}


