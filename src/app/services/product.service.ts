import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from './URL';
import { Observable } from 'rxjs';
import { TProduct } from '../types/TProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = `${APIURL}product/`;

  constructor(private http: HttpClient) {}
  getAllByCategoryId = (categoryId: string): Observable<{ data: TProduct[] }> =>
    this.http.get<{ data: TProduct[] }>(
      `${this.url}getAllByCategoryId/${categoryId}`
    );
}
