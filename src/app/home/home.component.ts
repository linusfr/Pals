import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ClubService } from '../services/club.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private clubService: ClubService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log(this.userService.isUserOnline());

    this.clubService.testQuery();
    this.clubService.getClubs();

    function createClub() {
      let administrator: string = (<any>window).user._id;
      let name = 'Hundefutter Gruppe';
      let description =
        'Wir mögen Hundefutter und treffen uns um zusammen Hundefutter zu futtern.';
      let theme = 'futterWatt()';
      let creationDate: number = Date.now();
      let time = 'Jeden Dienstag um 16 Uhr';
      let member = [administrator];

      return {
        administrator,
        name,
        description,
        theme,
        creationDate,
        time,
        member
      };
    }
    this.clubService.addClubs(createClub());
  }
}
