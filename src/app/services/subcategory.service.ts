import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TSubcategory } from '../types/TSubcategory';
import { APIURL } from './URL';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  url = `${APIURL}subcategory/`;

  constructor(private http: HttpClient) {}

  getAllByCategoryId = (
    categoryId: string
  ): Observable<{ data: TSubcategory[] }> =>
    this.http.get<{ data: TSubcategory[] }>(
      `${this.url}getAllByCategoryId/${categoryId}`
    );
}
