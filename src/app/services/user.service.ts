import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getActiveUser() {
    let user = localStorage.activeUser;
    const params = {
      params: new HttpParams().append('userID', user)
    };
    return this.http.get('/api/user/activeUser', params);
  }

  editUser(user) {
    return this.http.post('/api/user/edit', user);
  }
}
