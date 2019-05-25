import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  // @Input() user: any = {};

  user = "Hans Manuel";
  email = "hans.manuel@test.de"

  constructor() { }
  userSplit = [];

  ngOnInit() {
    this.userSplit = this.user.split(" ");
  }

}
