import { Component } from '@angular/core';
import { CometChatService } from '../CometChatService/comet-chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-login',
  templateUrl: './chat-login.component.html',
  styleUrls: ['./chat-login.component.scss']
})
export class ChatLoginComponent {
  hasError = false;

  constructor(private cometChat: CometChatService, private router: Router) {}

  login(userId: string, apiKey) {
    this.hasError = false;

    this.cometChat
      .login(userId, apiKey)
      .then(_ => this.router.navigateByUrl('chat'))
      .catch(err => {
        this.hasError = true;
        console.log(err);
      });
  }
}
