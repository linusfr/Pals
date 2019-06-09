// -----------------------------------------------------------------------------
//Dieser Service liefert die Funktionen, die nötig sind, um die Datenbank des Comet Chats
//mit unserer zu synchronisieren.
//So muss jeder Chatnutzer auch ein Nutzer in der Comet Chat Datenbank sein, 
//jeder Club auch eine Chatgruppe als Gegenstück haben und 
//jeder Nutzer in der Chatgruppe Mitglied sein, um den Chat nutzen zu können. 
//Zudem benötigt jeder Nutzer einen in der Chat-Datenbank hinterlegten Authentifizierungs-Token, 
//um den Chat nutzen zu können. 
//Dieser Service kann an allen Stellen der Anwendung aufgerufen werden,
//um dort auf die Funktionen zugreifen zu können.
//------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CometChatApiService {
  constructor(private http: HttpClient) { }

  // Funktion um einen Authentifizierungs-Token für jeden Nutzer zu erstellen, 
  // der im Chat eingeloggt werden soll.
  // Dieser Token wird dann in der Comet-Chat-eigenen Datenbank hinterlegt.
  // Der Aufruf hierzu funktioniert über XMLHttpRequest, wobei hierzu lediglich 
  // die userid, der API-Key und die App-Id vorliegen müssen
  createAuthToken(userid) {
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
      }
    });
    xhr.open(
      'POST',
      `https://api.cometchat.com/v1/users/${userid}/auth_tokens`
    );
    xhr.setRequestHeader('apikey', environment.cometChat.apiKey);
    xhr.setRequestHeader('appid', environment.cometChat.appId);
    xhr.send(data);
  }


  // Funktion um via Comet-Chat-API einen neuen Nutzer in der Comet-Chat-Datenbank zu erstellen.
  // Dies geschieht über einen XMLHttpRequest. Hierzu übergeben wir die NutzerId sowie den Nutzernamen. 
  createUser(userid, uname) {
    let data = `{\"uid\":\"${userid}\",\"name\":\"${uname}\"}`;

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
      }
    });

    xhr.open('POST', 'https://api.cometchat.com/v1/users');
    xhr.setRequestHeader('apikey', environment.cometChat.apiKey);
    xhr.setRequestHeader('appid', environment.cometChat.appId);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(data);
  }


  // Funktion um via Comet-Chat-API eine neue Gruppe in der Comet-Chat-Datenbank zu erstellen. 
  // Hierzu übergeben wir eine groupId, in unserem Fall immer die ClubId, und den Gruppennamen, 
  // also den Namen des Clubs, für den wir einen Gruppenchat benötigen.
  createGroup(groupid, groupname) {
    return new Promise((resolve, reject) => {
      let data = `{\"guid\":\"${groupid}\",\"name\":\"${groupname}\",\"type\":\"public\"}`;
      let xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
          resolve();
        }
      });
      xhr.open('POST', 'https://api.cometchat.com/v1/groups');
      xhr.setRequestHeader('apikey', environment.cometChat.apiKey);
      xhr.setRequestHeader('appid', environment.cometChat.appId);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(data);
    });
  }

  // Funktion um via Comet-Chat-API einer existierenden Gruppe in der Comet-Chat-Datenbank
  // neue Gruppenmitglieder hinzuzügen. Ist ein Nutzer der Gruppe nicht hinzugefügt, kann er 
  // den Gruppenchat nicht nutzen.
  // Hierbei handelt es sich wieder um ein XMLHttpRequest, dem wir die GruppenId und die NutzerId übergeben. 
  addGroupMember(groupid, userid) {
    let data = null;
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
      }
    });
    xhr.open(
      'POST',
      `https://api.cometchat.com/v1.6/groups/${groupid}/members/${userid}`
    );
    xhr.setRequestHeader('apikey', environment.cometChat.apiKey);
    xhr.setRequestHeader('appid', environment.cometChat.appId);
    xhr.send(data);
  }
}
