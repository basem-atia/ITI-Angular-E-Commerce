import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TProductCart } from '../types/TProductCart';
import { TPaymentPayLoad } from '../types/TPaymentPayLoad';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private httpclient: HttpClient) {}
  pay(
    payload: TPaymentPayLoad
  ): Observable<{ cash: string; client_secret: string }> {
    return this.httpclient.post<{ cash: string; client_secret: string }>(
      'http://localhost:3000/api/payment/create-payment-intent',
      { payload },
      {
        headers: { authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
  getToken(): null | string {
    return localStorage.getItem('authToken');
  }
  setToken(token: string): void {
    return localStorage.setItem('authToken', token);
  }
}
