import { Component, OnInit, OnDestroy, getDebugNode } from '@angular/core';
import { CometChatService } from '../CometChatService/comet-chat.service';
import { environment } from '../../../environments/environment';
import { ChatLoginComponent } from '../chat-login/chat-login.component';
import { CometChatApiService } from '../CometChatService/comet-chat-api.service';
import { UserService } from '../../services/user.service';
import { log } from 'util';

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
    private chatAuth: CometChatApiService,
    private userService: UserService
  ) {}

  currentUser() {
    return localStorage.activeUser;
  }

  ngOnInit() {
    this.messages = [];

    // Aktuellen Nutzer über userService abfragen, um den Nutzernamen für das Chatfenster zu erhalten
    this.userService.getActiveUser().subscribe(user => {
      console.log('userlog', user);
      this.user = user;
      this.fullname = this.user.fullname;
    });

    this.chatService.login(this.currentUser(), environment.cometChat.apiKey);
    this.getMessages().then(() => this.listenForMessages());

    console.log(this.messages);
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
        .then(messages => (this.messages = messages))
        .then(console.log, console.error);
    });
  }

  listenForMessages() {
    this.getGroupId().then(data => {
      let id = '' + data;
      this.chatService.listenForMessages(id, msg => {
        // console.log('message', msg, msg.sender.uid);
        let sender = '' + msg.sender.uid;
        if (msg.receiver === id && sender !== this.currentUser()) {
          msg.sender.uid = msg.sender.name;
          this.messages.push(msg);
        }
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
