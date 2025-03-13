import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url = 'http://localhost:3000/category/getAll';
  constructor(public http: HttpClient) {}
  getAll() {
    return this.http.get(this.url);
  }
}
