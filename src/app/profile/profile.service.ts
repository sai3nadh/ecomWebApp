import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserProfile {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileUrl = 'http://13.40.219.97:8084/'
  //  apiUrl 
   + 'api/users/';

  constructor(private http: HttpClient) { }

  getUserProfile(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.profileUrl}${userId}`);
  }
}
