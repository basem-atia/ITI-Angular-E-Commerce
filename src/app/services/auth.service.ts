import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIURL } from './URL';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private Url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // register
  register(userData: any): Observable<any> {
    return this.http.post(`${this.Url}/register`, userData);
  }

  // login
  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.Url}/login`, credentials);
  }

  //save token //
  saveToken(token: string): void {
    localStorage.setItem('authtoken', token);
  }

  // get token //
  getToken(): string | null {
    return localStorage.getItem('authtoken');
  }

  //logout
  logout(): void {
    localStorage.removeItem('authtoken');
  }

  //save user data
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user data
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  //remove user data
  removeUser(): void {
    localStorage.removeItem('user');
  }

  //update user data
  // updateUser(userData: any): Observable<any> {
  //   const token = this.getToken();
  //   return this.http.put(`${this.Url}/updateUser`, userData, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }

  //contact submit
  submitContactForm(contactData: any): Observable<any> {
    console.log('in service');

    // return this.http.post(`${this.Url}/contact`, contactData);
    return this.http.post(`${APIURL}contact`, contactData);
  }

}
