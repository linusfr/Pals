import { Component, OnInit, OnDestroy } from '@angular/core';
import { CometChatService } from '../CometChatService/comet-chat.service';
import { environment } from '../../../environments/environment';
import { ChatLoginComponent } from '../chat-login/chat-login.component';
import { CometChatApiService } from '../CometChatService/comet-chat-api.service';


@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit, OnDestroy {
  groupId: 'supergroup';
  messages = [];
  listenerId = 'Web_App_Listener_Group_ID';

  get currentUser() {
    return localStorage.activeUser
  }

  constructor(private chatService: CometChatService,private chatAuth: CometChatApiService) {}

  ngOnInit() {
    // Users are already members of the group
    this.chatService.joinGroup(this.groupId);
    this.chatService.login(this.currentUser); // <-- add getActiveUserService
    this.getMessages().then(_ => this.listenForMessages());
    console.log("createNewUser");
    console.log(this.currentUser);
    //this.chatAuth.createUser(localStorage.activeUser,"name");
  }

  sendMessage(message: string) {
    this.messages.push({
      text: message,
      sender: { uid: this.currentUser }
    });
    this.chatService.sendMessage(this.groupId, message);
    console.log(this.messages);
  }

  getMessages() {
    return this.chatService
      .getPreviousMessages(this.groupId)
      .then(messages => (this.messages = messages))
      .then(console.log, console.error);
  }

  listenForMessages() {
    console.log('registering messages listner');
    this.chatService.listenForMessages(this.listenerId, msg => {
      console.log('new message received: ', msg);
      this.messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    this.chatService.removeListener(this.listenerId);
  }
}