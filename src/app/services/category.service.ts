import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCategory } from '../types/TCategory';
import { Observable } from 'rxjs';
import { APIURL } from './URL';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = `${APIURL}category/`;
  constructor(public http: HttpClient) {}
  getAll(): Observable<{ data: TCategory[] }> {
    return this.http.get<{ data: TCategory[] }>(`${this.url}getAll`);
  }
}
