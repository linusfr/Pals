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
    this.http.get('/api/clubs').subscribe(clubs => {
      return clubs;
    });
  }

  addClubs(club) {
    console.log('add query called');
    this.http.post('/api/clubs/add', club).subscribe(res => {
      console.log(res);
      return res;
    });
  }

  testQuery() {
    console.log('test query called');
    this.http.get('/api/test').subscribe(test => {
      console.log(test);
    });
  }
}
