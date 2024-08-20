import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  // constructor() { }

  private apiUrl = 'http://localhost:8083/api/search';  // Replace with your actual API URL
  private apiCartUrl = 'http://localhost:8086/api/carts';

  constructor(private http: HttpClient) { }

  search(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?query=${query}`);
  }

   // Method to add item to cart
   addToCart(userId: string, productId: number, quantity: number): Observable<any> {
    const url = `${this.apiCartUrl}/${userId}/items`;
    const body = {
      productId: productId,
      quantity: quantity
    };

    return this.http.post(url, body);
  }
}
