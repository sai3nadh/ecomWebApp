import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  private apiUrl = 'http://localhost:8083/api/products';  // Adjust the API base URL

  constructor(private http: HttpClient) { }

  getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get(url);
  }

  getProductsByIds(productIds: number[]): Observable<any[]> {
    // Build the query parameters string
    const params = new HttpParams().appendAll({ ids: productIds });
    const url = `${this.apiUrl}/batch`;

    // Send the GET request with all product IDs
    return this.http.get<any[]>(url, { params });
  }
  
}
