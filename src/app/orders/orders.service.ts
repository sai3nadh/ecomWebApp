import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: number;
  userId: number;
  totalAmount: number;
  orderDate: string;
  orderItems: OrderItem[];
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


