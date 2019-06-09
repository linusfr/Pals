import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private http: HttpClient, private imgService: ImageService) {}

  //Holt alle Clubs
  getClubs() {
    return this.http.get('/api/clubs');
  }
  //Übergibt alle Clubs, denen der mitgegebene User beigetreten ist
  getJoinedClubs() {
    let userID = localStorage.activeUser;
    //Parameter, die man dem HttpClient übergibt
    const params = {
      params: new HttpParams().append('userID', userID)
    };
    //Route, die wir aufrufen inkl. Parameter
    return this.http.get('/api/clubs/joined', params);
  }

  //Gibt die Detailansicht des Clubs zurück, dessen ID mitgegeben wird.
  //Die UserID wird gebraucht, um zu prüfen, ob der User bereits Mitglied des Clubs ist.
  //Entsprechend wären die Ansichten unterschiedlich.
  getDetailedClub(clubID, userID) {
    const params = {
      params: new HttpParams().append('clubID', clubID).append('userID', userID)
    };
    return this.http.get('/api/clubs/detailedClub', params);
  }

  //Hier erfolgt das Hinzufügen eines neuen Clubs
  async addClubs(club) {
    let category = '' + club.category;

    //Dem neuen Club wird ein zufälliges Bild mittels ImageService hinzugefügt
    let imgURL = await this.imgService.getRandomPicture(category);
    club.imgURL = imgURL;
    return this.http.post('/api/clubs/add', club);
  }

  //Bearbeitung von Clubs, als Parameter wird der zu bearbeitende Club mitgegeben
  editClub(club) {
    return this.http.post('/api/clubs/edit', club);
  }

  //Es wird dem angemeldeten User ermöglicht, einem Club beizutreten
  addMember = (club, activeUser) => {
    //activeUser ist dem LocalStorage entnommen
    let data = { club: club, activeUser: activeUser };
    return this.http.post('/api/clubs/addMember', data);
  }

  //Der aktuell angemeldete User kann aus einer Gruppe austreten
  removeMember = (club, activeUser) => {
    //activeUser ist dem LocalStorage entnommen
    let data = { club: club, activeUser: activeUser };
    return this.http.post('/api/clubs/removeMember', data);
  }

  //Ermöglicht die Suche nach Clubs, nach Namen und/oder Kategorie
  searchClubs = (name, category) => {
    const params = {
      params: new HttpParams().append('name', name).append('category', category)
    };
    return this.http.get('/api/clubs/search', params);
  }
}
