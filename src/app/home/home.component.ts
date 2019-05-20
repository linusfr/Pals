import { Subscription } from 'rxjs/Subscription';
import { ClubService } from './../services/club.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
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

  clubs;

  ngOnInit() {
    console.log(this.userService.isUserOnline());

    // ----------- GET CLUBS -> WORKING! -----------------------
    // this.clubService.getClubs().subscribe(data => console.log(data));
    this.clubService.getClubs().subscribe(clubs => {
      this.clubs = clubs;
    });

    // ----------- GET DETAILED CLUB -> WORKING! -----------------------
    // this.clubService
    //   .getDetailedClub('5cd6df7e4085dc3313ad1650', '5ca3510d6562c22643c589d2')
    //   .subscribe(data => console.log(data));

    // ----------- ADD CLUBS -> WORKING! -----------------------
    // this.clubService
    //   .addClubs(this.createClub('Laufgruppe', 'Lass laufen.'))
    //   .subscribe(data => console.log(data));

    // ----------- ADD SAMPLE DATA  -----------------------
    // this.clubService
    //   .addClubs(this.createClub('Laufgruppe', 'Lass laufen.'))
    //   .subscribe(data => console.log(data));
    // this.clubService
    //   .addClubs(this.createClub('Hundefutter Gruppe', 'Hunde füttern.'))
    //   .subscribe(data => console.log(data));
    // this.clubService
    //   .addClubs(this.createClub('Schach', 'und matt.'))
    //   .subscribe(data => console.log(data));
    // this.clubService
    //   .addClubs(this.createClub('Kletteräffchen', 'Ran an die Wand.'))
    //   .subscribe(data => console.log(data));
    // this.clubService
    //   .addClubs(
    //     this.createClub('Pokerrunde', 'Wir ziehen dir das Geld aus der Tasche.')
    //   )
    //   .subscribe(data => console.log(data));
  }

  createClub(name, brief) {
    let administrator: string = (<any>window).user._id;
    let description = 'Hunde füttern';
    let creationDate: number = Date.now();
    let time = 'Jeden Dienstag um 16 Uhr';
    let member = [administrator];

    return {
      administrator,
      name,
      description,
      brief,
      creationDate,
      time,
      member
    };
  }

  
}
