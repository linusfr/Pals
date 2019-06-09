// -----------------------------------------------------------------------------
//Dieser Service liefert alle nötigen Funktionen, die der Chat zum
//Starten und Funktionieren benötigt.
//Der Service kann an allen Stellen der Anwendung aufgerufen werden,
//um dort auf die Funktionen zugreifen zu können.
//------------------------------------------------------------------------------

import { Injectable, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})

export class CometChatService {
  constructor(private userService: UserService) { }
  currentUser;

  // Bei Aufruf dieses Services wird der aktuell in der Anwendung angemeldete 
  // Nutzer als currentUser gespeichert
  ngOnInit() {
    this.userService.getActiveUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  // Funktion zum Initialisieren des Chats:
  // Nimmt als Parameter lediglich die App-Id, welche man von CometChat erhält.
  // Diese ist in der Datei environment hinterlegt.
  // Die Methode liefert ein Promise, welches genutzt wird,um in der Konsole 
  // Rückmeldung zu geben, ob die Initialisierung des Chats erfolgreich war
  init(appID: string = environment.cometChat.appId) {
    CometChat.init(appID).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('Initialization failed: ', err);
        throw err;
      }
    );
  }

  // Funktion zum Einloggen des Nutzers in den Chat
  // Als Parameter werden der aktuelle Nutzer und der API-Schlüssel übergeben
  // Bei erfolgreicher Anmeldung wird eine passende Konsolennachricht ausgegeben.
  // Der Nutzer kann den Chat nicht nutzen, wenn er nicht eingeloggt ist
  login(userId: string, apiKey) {
    return CometChat.login(userId, apiKey)
      .then(usr => (this.currentUser = usr), (this.currentUser = null))
      .then(_ => console.log('User logged in'), console.error);
  }

  sendMessage(receiverId: string, text: string) {
    const message = new CometChat.TextMessage(
      receiverId,
      text,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.GROUP
    );

    return CometChat.sendMessage(message);
  }

  listenForMessages(listenerId: string, onMessageReceived: (msg: any) => void) {
    CometChat.addMessageListener(
      listenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: onMessageReceived,
        onMediaMessageReceived: _ => undefined
      })
    );
  }

  removeListener(listenerId: string) {
    CometChat.removeMessageListener(listenerId);
  }

  joinGroup(groupId: string) {
    return CometChat.joinGroup(groupId, CometChat.GROUP_TYPE.PUBLIC, '');
  }

  getPreviousMessages(groupId: string) {
    const messageRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(groupId)
      .setLimit(30)
      .build();

    return messageRequest.fetchPrevious();
  }
}
