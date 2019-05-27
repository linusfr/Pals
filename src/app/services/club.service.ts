import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http: HttpClient) {}

  getClubs() {
    return this.http.get('/api/clubs');
  }
  getJoinedClubs() {
    let userID = localStorage.activeUser;
    const params = {
      params: new HttpParams().append('userID', userID)
    };
    return this.http.get('/api/clubs/joined', params);
  }

  getDetailedClub(clubID, userID) {
    const params = {
      params: new HttpParams().append('clubID', clubID).append('userID', userID)
    };
    return this.http.get('/api/clubs/detailedClub', params);
  }

  addClubs(club) {
    console.log(club);
    return this.http.post('/api/clubs/add', club);
  }

  testQuery() {
    console.log('test query called');
    this.http.get('/api/test').subscribe(test => {
      console.log(test);
    });
  }
}
