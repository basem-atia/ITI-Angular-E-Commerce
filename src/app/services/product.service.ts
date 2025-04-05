import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from './URL';
import { Observable } from 'rxjs';
import { TProduct } from '../types/TProduct';
import { TFilter } from '../types/TFilter';
import { TPrices } from '../types/TPrices';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = `${APIURL}product/`;

  constructor(private http: HttpClient) {}
  getAllByCategoryId = (
    categoryId: string,
    pageNum: number
  ): Observable<{ data: TProduct[]; numberOfPages: number; prices: TPrices }> =>
    this.http.get<{ data: TProduct[]; numberOfPages: number; prices: TPrices }>(
      `${this.url}getAllByCategoryId/${categoryId}/${pageNum}`
    );

  getByFilter = (
    filter: TFilter
  ): Observable<{ data: TProduct[]; numberOfPages: number; prices: TPrices }> =>
    this.http.post<{
      data: TProduct[];
      numberOfPages: number;
      prices: TPrices;
    }>(`${this.url}getByFilter`, { filter });
}
