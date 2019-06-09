// -----------------------------------------------------------------------------
//Dieser Service liefert alle nötigen Funktionen, die der Chat zum
//Starten und Funktionieren benötigt.
//Dieser Service kann an allen Stellen der Anwendung aufgerufen werden,
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


  // Funktion um eine Nachricht an den Comet Chat Server und somit über Umweg an den aktuellen Gruppenchat zu senden. 
  // Dabei werden die Empfänger-ID (in unseren Fällen immer eine Gruppen-ID), 
  // der eigentliche Text, sowie die Nachrichten-Art und Empfänger-Art (Gruppe oder Einzelperson)
  // übergeben.
  sendMessage(receiverId: string, text: string) {
    const message = new CometChat.TextMessage(
      receiverId,
      text,
      CometChat.MESSAGE_TYPE.TEXT,
      CometChat.RECEIVER_TYPE.GROUP
    );
    return CometChat.sendMessage(message);
  }

  // Funktion um aktuell hereinkommende Nachrichten zu erkennen und darzustellen
  // Dies erreicht man mit Hilfe eines Message Listeners. Dieser erhält eine 
  // einzigartige ID, in unserem Fall die ClubId. Mithilfe der MessageListener API 
  // von Comet Chat können wir dann Handler für die unterschiedlichen Arten von 
  // Nachrichten registrieren
  listenForMessages(listenerId: string, onMessageReceived: (msg: any) => void) {
    CometChat.addMessageListener(
      listenerId,
      new CometChat.MessageListener({
        onTextMessageReceived: onMessageReceived,
        onMediaMessageReceived: _ => undefined
      })
    );
  }

  // Funktion zum Entfernen des durch "listenForMessages" erstellten Message Listeners
  // Übergeben wird hier einfach die Listener ID
  removeListener(listenerId: string) {
    CometChat.removeMessageListener(listenerId);
  }

  joinGroup(groupId: string) {
    return CometChat.joinGroup(groupId, CometChat.GROUP_TYPE.PUBLIC, '');
  }

  // Funktion zum Abrufen vorheriger Nachrichten
  // Über die Comet Chat API können wir die Nachrichten über einen message request abrufen
  // Dafür übergeben wir lediglich die GruppenID, also die ClubId, 
  // und begrenzen die Anzahl der Nachrichten, die abgerufen werden
  getPreviousMessages(groupId: string) {
    const messageRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(groupId)
      .setLimit(30)
      .build();

    return messageRequest.fetchPrevious();
  }
}
