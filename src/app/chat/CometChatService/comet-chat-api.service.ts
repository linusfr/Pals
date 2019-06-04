import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CometChatApiService {

  constructor() { }


  createAuthToken(userid) {
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", `https://api.cometchat.com/v1/users/${userid}/auth_tokens`);
    xhr.setRequestHeader("apikey", environment.cometChat.apiKey);
    xhr.setRequestHeader("appid", environment.cometChat.appId);

    xhr.send(data);
  }

  // Methode um via API von CometChat in deren System einen neuen Nutzer zu erstellen
  createUser(userid, uname) {
    var data = "{\"uid\": userid,\"name\": uname,\"metadata\":\"\"}";

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://api.cometchat.com/v1/users");
    xhr.setRequestHeader("apikey", environment.cometChat.apiKey);
    xhr.setRequestHeader("appid", environment.cometChat.appId);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(data);
  }

}
