import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user;
  email;
  fullname;

  constructor(private userService: UserService) { }
  userSplit = [];

  ngOnInit() {
    this.userService.getActiveUser().subscribe( user =>{
      console.log(user);
      this.user = user;
      this.email = this.user.email;
      this.fullname = this.user.fullname;
      this.userSplit = this.fullname.split(" ");
      this.userSplit.forEach(value => console.log(value))
    })
  }

}