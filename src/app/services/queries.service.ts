import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private http: HttpClient) {}
  getClubs() {
    console.log('in getClubs');
    this.http.get('/api/clubs/test').subscribe(test => {
      console.log(test);
    });
  }
  testQuery() {
    console.log('test query called');
    this.http.get('/api/clubs/test').subscribe(test => {
      console.log(test);
    });
  }
}
