import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private apiUrl =   'http://localhost:8085/api' ;
  // 'http://localhost:8084/api/nav'; // Adjust URL accordingly

  constructor(private http: HttpClient) { }

  // getCategories(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/categories`);
  // }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return of([]); // Return an empty array or handle as needed
      })
    );
  }

  // constructor() { }
}
