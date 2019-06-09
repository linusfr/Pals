// -----------------------------------------------------------------------------
//Diese Komponente dient der Erstellung des Gruppenchats.
//
//Das Template (html-Datei) beinhaltet das eigentliche Chatfenster 
//und das Eingabefeld für Nachrichten.
//------------------------------------------------------------------------------

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CometChatService } from '../CometChatService/comet-chat.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit, OnDestroy {
  messages = [];
  user;
  fullname;

  constructor(
    private chatService: CometChatService,
    private userService: UserService
  ) { }

  // Funktion ruft den aktuell gespeicherten Nutzer aus dem Local Storage auf und gibt diesen zurück
  currentUser() {
    return localStorage.activeUser;
  }

  // Beim Aufruf wird das aktuelle Nachrichten-Array des Club-Chats geleert und der aktuelle Nutzer abgefragt.
  // Der Nutzer wird in den Chat eingeloggt und die vorherigen Nachrichten für den aktuellen Club-Gruppenchat werden abgerufen.
  ngOnInit() {
    this.messages = [];

    // Aktuellen Nutzer über userService abfragen, um den Nutzernamen für das Chatfenster zu erhalten
    this.userService.getActiveUser().subscribe(user => {
      console.log('userlog', user);
      this.user = user;
      this.fullname = this.user.fullname;
    });

    //Der Nutzer wird in den Chat eingeloggt und die aktuellen Nachrichten werden abgerufen.  
    //Hier ist ein Timeout nötig, da der Websocket sonst noch nicht fertig geladen hat und ein Fehler geworfen wird
    setTimeout(() => {
      this.chatService.login(this.currentUser(), environment.cometChat.apiKey);
      this.getMessages().then(data => this.listenForMessages());
    }, 400);
  }

  // Funktion um die aktuelle Club-ID aus dem Local Storage zu lesen und zurückzugeben
  getGroupId() {
    return new Promise((resolve, reject) => {
      resolve(localStorage.clubID);
    });
  }

  // Funktion um eine Nachricht im Chat zu schreiben
  // Dabei wird zunächst die aktuelle clubId ausgelesen und zusammen mit der Nachricht 
  // an die Methode sendMessage des Comet-Chat-Service übergeben, der die Nachricht letztendlich versendet. 
  // Zudem wird die Nachricht zusammen mit dem Nutzernamen dem Nachrichten-Array hinzugefügt, 
  // damit wir diese auch im Chat-Fenster lesen können. 
  sendMessage(message: string) {
    this.getGroupId().then(data => {
      let id = '' + data;
      this.messages.push({
        text: message,
        sender: { uid: this.fullname }
      });
      this.chatService.sendMessage(id, message);
    });
  }

  // Diese Funktion dient dazu, die vorherigen Nachrichten eines Gruppenchats abzufragen
  // hierzu wird die ClubId-abgefragt und an die Methode getPreviousMessages des Comet-Chat-Service übergeben.
  // Die dadurch vom Comet-Chat-Server angefragten Nachrichten werden im lokalen Message-Array gespeichert. 
  // Da die Abfrage der ClubId längert dauert und die getMessage-Abfrage sonst eine Fehlermeldung 
  // werfen würde, da groupId noch nicht gesetzt ist, muss die Nachricht asynchron laufen und ein 
  // Promise zurückgeben, mit dem wir dann weiterarbeiten können
  async getMessages() {
    this.getGroupId().then(data => {
      let id = '' + data;
      return this.chatService
        .getPreviousMessages(id)
        .then(messages => {
          this.messages = messages;
        })
        .then(console.log, console.error);
    });
  }

  // Funktion um aktuelle, neu geschriebene Nachrichten zu erkennen und darzustellen
  // Hier wird die im Comet-Chat-Service definitierte Methode listerForMessages aufgerufen und 
  // so ein MessageListener erstellt, der im aktuellen Gruppenchat nach neuen Nachrichten horcht.
  // Werden eine neue Nachricht entdeckt, die für diese Gruppe bzw. diesen Club gedacht ist,
  // wird die Nachricht auf das Message Array geschoben. 
  listenForMessages() {
    this.getGroupId().then(data => {
      let id = '' + data;
      this.chatService.listenForMessages(id, msg => {
        let sender = '' + msg.sender.uid;
        if (msg.receiver === id) {
          msg.sender.uid = msg.sender.name;
          this.messages.push(msg);
        }
      });
    });
  }

  // Im Falle eines Destroy-Events, wenn also z.B. die aktuelle Club-ansicht verlassen wird,
  // wird der aktuelle Message Listener entfernt und das Message-Array wieder geleert. 
  ngOnDestroy(): void {
    this.getGroupId().then(data => {
      let id = '' + data;
      this.chatService.removeListener(id);
      this.messages = [];
    });
  }
}
