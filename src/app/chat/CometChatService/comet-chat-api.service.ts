import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CometChatApiService {
  constructor(private http: HttpClient) {}

  // Methode um einen Authentifizierungs-Token für jeden Nutzer zu erstellen, der im Chat eingeloggt werden soll
  createAuthToken(userid) {
    let data = null;

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
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

  // Methode um via API von CometChat in deren System einen neuen Nutzer zu erstellen

  createUser(userid, uname) {
    let data = `{\"uid\":\"${userid}\",\"name\":\"${uname}\"}`;

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
      }
    });

    xhr.open('POST', 'https://api.cometchat.com/v1/users');
    xhr.setRequestHeader('apikey', environment.cometChat.apiKey);
    xhr.setRequestHeader('appid', environment.cometChat.appId);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(data);
  }

  createGroup(groupid, groupname) {
    return new Promise((resolve, reject) => {
      let data = `{\"guid\":\"${groupid}\",\"name\":\"${groupname}\",\"type\":\"public\"}`;

      let xhr = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
          resolve();
          console.log(this.responseText);
        }
      });

      xhr.open('POST', 'https://api.cometchat.com/v1/groups');
      xhr.setRequestHeader('apikey', environment.cometChat.apiKey);
      xhr.setRequestHeader('appid', environment.cometChat.appId);
      xhr.setRequestHeader('content-type', 'application/json');

      xhr.send(data);
    });
  }

  addGroupMember(groupid, userid) {
    let data = null;

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
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
