import { Component, OnInit, OnDestroy } from '@angular/core';
import { CometChatService } from '../CometChatService/comet-chat.service';
import { environment } from '../../../environments/environment';
import { ChatLoginComponent } from '../chat-login/chat-login.component';
import { CometChatApiService } from '../CometChatService/comet-chat-api.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit, OnDestroy {
  // groupId= localStorage.getItem('clubID');    // <- fix so that it takes the current club id instead, but throws cannot read data error!

  groupId;
  messages = [];
  listenerId = 'Web_App_Listener_Group_ID';
  user;
  fullname;

  constructor(
    private chatService: CometChatService,
    private chatAuth: CometChatApiService,
    private userService: UserService
  ) { }

  currentUser() {
    return localStorage.activeUser;
  }

  ngOnInit() {
    // this.chatService.joinGroup(this.groupId);

    //Aktuellen Nutzer über userService abfragen, um den Nutzernamen für das Chatfenster zu erhalten
    this.userService.getActiveUser().subscribe(user => {
      console.log(user);
      this.user = user;
      this.fullname = this.user.fullname;
    })
    console.log(`local storage - clubID : ${localStorage.getItem("clubID")}`)
    this.groupId = localStorage.getItem("clubID");

    this.chatService.login(this.currentUser(), environment.cometChat.apiKey);
    console.log(`current user is logged in: ${this.currentUser()}`);
    
    setTimeout(function () {
      this.getMessages().then(data => this.listenForMessages()); // this needs to run async, as groupid needs to be read from localstorage first, which takes about 3ms
    }, 400);


  }

  sendMessage(message: string) {
    this.messages.push({
      text: message,
      sender: { uid: this.fullname }  // übergibt statt userid den Nutzernamen, damit dieser im Chat dargestellt wird
      // sender: { uid: this.currentUser() }
    });
    this.chatService.sendMessage(this.groupId, message);
    console.log('message', this.messages);
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
