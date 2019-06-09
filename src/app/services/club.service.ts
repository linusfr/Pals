import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ImageService } from './image.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http: HttpClient, private imgService: ImageService) {}

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

  async addClubs(club) {
    console.log(club);

    let category = '' + club.category;

    let imgURL = await this.imgService.getRandomPicture(category);
    club.imgURL = imgURL;
    return this.http.post('/api/clubs/add', club);
  }

  editClub(club) {
    console.log(club);
    return this.http.post('/api/clubs/edit', club);
  }

  addMember = (club, activeUser) => {
    let data = { club: club, activeUser: activeUser };
    return this.http.post('/api/clubs/addMember', data);
  }

  removeMember = (club, activeUser) => {
    let data = { club: club, activeUser: activeUser };
    return this.http.post('/api/clubs/removeMember', data);
  }

  searchClubs = (name, category) => {
    const params = {
      params: new HttpParams().append('name', name).append('category', category)
    };
    return this.http.get('/api/clubs/search', params);
  }
}
