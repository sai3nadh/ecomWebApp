import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Review {
  reviewId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Image {
  imageId: number;
  imageUrl: string;
  altText: string | null;
}

export interface Product {
  quantity: number;
  productId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  reviews: Review[];
  images: Image[];
  categoryId: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  
  private apiUrl = environment.apiUrl+'api/products';
  // 'http://localhost:8083/api/products';  // Adjust the API base URL

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
