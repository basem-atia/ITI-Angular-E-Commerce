import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // register
  register(userData: any): Observable<any> {
    return this.http.post(`${this.Url}/api/reg`, userData);
  }

  // login
  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(
      `${this.Url}/api/log`,
      credentials
    );
  }

  //save token
  saveToken(token: string): void {
    localStorage.setItem('authtoken', token);
  }

  // get token
  getToken(): string | null {
    return localStorage.getItem('authtoken');
  }

  //logout
  logout(): void {
    localStorage.removeItem('authtoken');
  }
}
