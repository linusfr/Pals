import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http: HttpClient) {}

  getClubs() {
    return this.http.get('/api/clubs');
  }

  addClubs(club) {
    return this.http.post('/api/clubs/add', club);
  }

  testQuery() {
    console.log('test query called');
    this.http.get('/api/test').subscribe(test => {
      console.log(test);
    });
  }
}
