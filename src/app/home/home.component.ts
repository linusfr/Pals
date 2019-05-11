import { ClubService } from './../services/club.service';
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

    // ----------- GET CLUBS -> WORKING! -----------------------
    // this.clubService.getClubs().subscribe(data => console.log(data));

    // ----------- ADD CLUBS -> WORKING! -----------------------
    // this.clubService
    //   .addClubs(this.createClub())
    //   .subscribe(data => console.log(data));
  }

  createClub() {
    let administrator: string = (<any>window).user._id;
    let name = 'Hundefutter Gruppe';
    let description = 'Ganz tolle Testgruppe';
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
}
