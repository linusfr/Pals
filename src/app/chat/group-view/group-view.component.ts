import { Component, OnInit, OnDestroy, getDebugNode } from '@angular/core';
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
  ) {}

  currentUser() {
    return localStorage.activeUser;
  }

  // currentGroup(){
  //   return localStorage.clubID;
  // }

  ngOnInit() {
    this.messages = [];
    // this.chatService.joinGroup(this.groupId);

    // Aktuellen Nutzer über userService abfragen, um den Nutzernamen für das Chatfenster zu erhalten
    this.userService.getActiveUser().subscribe(user => {
      console.log('userlog', user);
      this.user = user;
      this.fullname = this.user.fullname;
    });
    // console.log(`local storage - clubID : ${localStorage.getItem("clubID")}`)

    this.chatService.login(this.currentUser(), environment.cometChat.apiKey);
    this.getMessages().then(data => this.listenForMessages());

    // console.log(`current user is logged in: ${this.currentUser()}`);

    // getMessages needs to run async, as groupid needs to be read from localstorage first,
    // which takes about 3ms. Hence we will use a Promise and wait for it to resolve, before we continue
    // this.groupId = localStorage.getItem("clubID");
    // this.getGroupId().then(data => this.getMessages()).then(data => this.listenForMessages());

    // this.getMessages().then(data => this.listenForMessages());

    // this.asyncLocalStorage.getItem('clubID')
    //   .then(function (value) {
    //    // this.groupId = value;
    //     console.log('Value has been set to:', value);
    //   });
  }

  // asyncLocalStorage = {
  //   getItem: async function (key) {
  //     await Promise.resolve();
  //     return localStorage.getItem(key);
  //   }
  // }

  // // function containing Promise to get groupId for chat room to be able to get messages
  getGroupId() {
    return new Promise((resolve, reject) => {
      resolve(localStorage.clubID);
    });
  }

  // setTimeout(() => {
  //     }, 500);

  sendMessage(message: string) {
    this.getGroupId().then(data => {
      let id = '' + data;
      this.messages.push({
        text: message,
        sender: { uid: this.fullname } // übergibt statt userid den Nutzernamen, damit dieser im Chat dargestellt wird
        // sender: { uid: this.currentUser() }
      });
      this.chatService.sendMessage(id, message);
      // this.chatService.sendMessage(this.currentGroup(), message);
      console.log('message', this.messages);
    });
  }

  async getMessages() {
    setTimeout(() => {
      this.getGroupId().then(data => {
        let id = '' + data;
        console.log('groupID', id);
        return (
          this.chatService
            // .getPreviousMessages(this.currentGroup())
            .getPreviousMessages(id)
            .then(messages => (this.messages = messages))
            .then(console.log, console.error)
        );
      });
    }, 2000);
  }

  listenForMessages() {
    this.getGroupId().then(data => {
      let id = '' + data;
      console.log('registering messages listner');
      this.chatService.listenForMessages(id, msg => {
        console.log('new message received: ', msg);
        console.log(msg.sender.uid, this.currentUser());
        let sender = '' + msg.sender.uid;
        if (msg.receiver === id && sender !== this.currentUser()) {
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
