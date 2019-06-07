import { Injectable, OnInit } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Injectable({
  providedIn: 'root'
})
export class CometChatService {
  constructor(private userService: UserService) {}
  currentUser;

  // currentName = this.currentUser.fullname;
  ngOnInit() {
    this.userService.getActiveUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  init(appID: string = environment.cometChat.appId) {
    CometChat.init(appID).then(
      msg => console.log('Initialized succesfull: ', msg),
      err => {
        console.log('Initialization failed: ', err);
        throw err;
      }
    );
  }

  login(userId: string, apiKey) {
    return CometChat.login(userId, apiKey)
      .then(usr => (this.currentUser = usr), (this.currentUser = null))
      .then(_ => console.log('User logged in'), console.error);
  }

  sendMessage(receiverId: string, text: string) {
    receiverId = localStorage.clubID;
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
