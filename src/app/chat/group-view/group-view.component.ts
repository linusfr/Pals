// -----------------------------------------------------------------------------
//Diese Komponente dient der Erstellung des Gruppenchats
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
  // groupId= localStorage.getItem('clubID');    // <- fix so that it takes the current club id instead, but throws cannot read data error!

  messages = [];
  user;
  fullname;

  constructor(
    private chatService: CometChatService,
    private userService: UserService
  ) {}

  // Funktion ruft den aktuell gespeicherten Nutzer aus dem Local Storage auf und gibt diesen zurück
  currentUser() {
    return localStorage.activeUser;
  }

  // Beim Aufruf 
  ngOnInit() {
    this.messages = [];

    // Aktuellen Nutzer über userService abfragen, um den Nutzernamen für das Chatfenster zu erhalten
    this.userService.getActiveUser().subscribe(user => {
      console.log('userlog', user);
      this.user = user;
      this.fullname = this.user.fullname;
    });

    // Timeout nötig, da Websocket sonst noch nicht fertig geladen hat und ein Fehler geworfen wird
    setTimeout(() => {
      this.chatService.login(this.currentUser(), environment.cometChat.apiKey);
      this.getMessages().then(data => this.listenForMessages());
    }, 400);
  }

  getGroupId() {
    return new Promise((resolve, reject) => {
      resolve(localStorage.clubID);
    });
  }

  sendMessage(message: string) {
    this.getGroupId().then(data => {
      let id = '' + data;
      // console.log(this.fullname);

      this.messages.push({
        text: message,
        sender: { uid: this.fullname }
      });
      this.chatService.sendMessage(id, message);
    });
  }

  async getMessages() {
    this.getGroupId().then(data => {
      let id = '' + data;
      return this.chatService
        .getPreviousMessages(id)
        .then(messages => {
          this.messages = messages;
          console.log('test', messages);
        })
        .then(console.log, console.error);
    });
  }

  listenForMessages() {
    this.getGroupId().then(data => {
      let id = '' + data;
      this.chatService.listenForMessages(id, msg => {
        let sender = '' + msg.sender.uid;
        if (msg.receiver === id) {
          msg.sender.uid = msg.sender.name;
          this.messages.push(msg);
        }
        // sender !== this.currentUser()
      });
    });
  }

  ngOnDestroy(): void {
    this.getGroupId().then(data => {
      let id = '' + data;
      this.chatService.removeListener(id);
      this.messages = [];
    });
  }
}
