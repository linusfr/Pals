import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CometChatApiService {
  constructor(private http: HttpClient) {}

  createAuthToken(userid) {
    let data = null;

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
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

  // createUser(id, name) {
  //   const params = {
  //     params: new HttpParams()
  //       .append('uid', id)
  //       .append('name', name)
  //       .append('apikey', environment.cometChat.appId)
  //   };
  //   return this.http.post('https://api.cometchat.com/v1/users', params);
  // }

  createUser(userid, uname) {
    // let data = `{uid: ${userid}, name: ${uname}, metadata :""}`;
    // tslint:disable-next-line:quotemark
    let data = `{\"uid\":\"${userid}\",\"name\":\"${uname}\"}`;

    let xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open('POST', 'https://api.cometchat.com/v1/users');
    xhr.setRequestHeader('apikey', environment.cometChat.apiKey);
    xhr.setRequestHeader('appid', environment.cometChat.appId);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(data);
  }
}
