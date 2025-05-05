import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TProduct } from '../types/TProduct';
import { StorageKeys } from '../constant';
import { APIURL } from './URL';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ApiUrl: string = `${APIURL}`;
  constructor(private httpClient: HttpClient) {}

  getUser(): Observable<{ user: { username: string; emailphone: string } }> {
    return this.httpClient.get<{ user: any }>(
      `https://iti-angular-e-commerce-back-end-production.up.railway.app/api/profile/getUser`,
      {
        headers: { authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
  changePassword(
    oldPass: string,
    newPass: string,
    username: string,
    emailphone: string,
    address: string
  ): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(
      `https://iti-angular-e-commerce-back-end-production.up.railway.app/api/profile/changepassword`,
      {
        oldPass,
        newPass,
        username,
        emailphone,
        address,
      },
      { headers: { authorization: `Bearer ${this.getToken()}` } }
    );
  }
  forgetPassword(email: string): Observable<any> {
    return this.httpClient.post(
      `https://iti-angular-e-commerce-back-end-production.up.railway.app/api/profile/password/forgetPassword`,
      { email },
      {
        headers: { authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
  resetPasswordWithEmail(
    newPassword: string,
    resetToken: string
  ): Observable<any> {
    return this.httpClient.post(
      `https://iti-angular-e-commerce-back-end-production.up.railway.app/api/profile/password/resetPasswordWithEmail`,
      { newPassword, resetToken },
      {
        headers: { authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
  resetPasswordWithPhone(newPassword: string, code: string): Observable<any> {
    return this.httpClient.post(
      `https://iti-angular-e-commerce-back-end-production.up.railway.app/api/profile/password/resetPasswordWithPhone`,
      { newPassword, code },
      {
        headers: { authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
  getProductsFromStorage() {
    // const prd = [
    //   { productsId: '67eeeaa6b1220a66606c9597', count: '3' },
    //   { productsId: '67eeeaa6b1220a66606c9599', count: '4' },
    //   { productsId: '67eeeaadb1220a66606c95f4', count: '5' },
    //   { productsId: '67eeeab0b1220a66606c961b', count: '4' },
    //   { productsId: '67eeeab4b1220a66606c9643', count: '4' },
    // ];
    // const jsonString = JSON.stringify(prd);
    // localStorage.setItem('products', jsonString);
    const products: { productsId: string; count: number }[] = JSON.parse(
      localStorage.getItem('products') || '[]'
    );
    return products;
  }
  getProductsById(): Observable<{ data: TProduct[] } | null> {
    let products: { productsId: string; count: number }[] =
      this.getProductsFromStorage();
    if (!products || products.length === 0) {
      return of(null);
    }

    let productIds: string[] = [];
    products.forEach((elem, i) => {
      productIds.push(elem.productsId);
    });
    return this.httpClient.post<{ data: TProduct[] }>(
      `https://iti-angular-e-commerce-back-end-production.up.railway.app/api/product/getByIds`,
      { ids: productIds },
      {
        headers: { authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
  logout(): void {
    localStorage.removeItem(StorageKeys.LToken);
  }
  getToken(): null | string {
    return localStorage.getItem(StorageKeys.LToken);
  }
  setToken(token: string): void {
    return localStorage.setItem(StorageKeys.LToken, token);
  }
  register(userData: any): Observable<any> {
    return this.httpClient.post(`${this.ApiUrl}register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.httpClient.post<{ token: string }>(
      `${this.ApiUrl}login`,
      credentials
    );
  }
  //save user data
  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }

  submitContactForm(contactData: any): Observable<any> {
    return this.httpClient.post(`${APIURL}contact`, contactData);
  }
  getContactUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
