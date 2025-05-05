import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOrder } from '../types/TOrder';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpclient: HttpClient) {}
  getOrders(): Observable<{ orders: TOrder[] }> {
    return this.httpclient.get<{ orders: TOrder[] }>(
      'https://iti-angular-e-commerce-back-end-production.up.railway.app/api/ordersSummary/getOrders',
      {
        headers: { authorization: `Bearer ${this.getToken()}` },
      }
    );
  }
  getToken(): null | string {
    return localStorage.getItem('authtoken');
  }
  setToken(token: string): void {
    return localStorage.setItem('authtoken', token);
  }
}
