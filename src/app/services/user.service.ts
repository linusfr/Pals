//Im UserService wird die für die User benötigte Logik verwaltet

import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  //Gibt die ID des angemeldeten Users zurück
  getActiveUser() {
    let user = localStorage.activeUser;
    //Hier wird die ID des User als Parameter mitgegeben
    const params = {
      params: new HttpParams().append('userID', user)
    };
    return this.http.get('/api/user/activeUser', params);
  }

  //Wird benötigt, um die Daten des angemeldeten Users bearbeiten zu können
  editUser(user) {
    return this.http.post('/api/user/edit', user);
  }
}
