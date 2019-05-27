import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get('/api/category');
  }
  addCategory(category) {
    return this.http.post('/api/category/add', category);
  }
}
