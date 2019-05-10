import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/queries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private queryService: QueryService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.queryService.testQuery();
    this.queryService.getClubs();

    let date = new Date();

    this.authService.getUser().subscribe(value => {
      console.log('userUserOnline', value);
    });

    let user = (<any>window).user;
    let loggedIn = user !== undefined;
    console.log('user', (<any>window).user);
    console.log('logged In:', loggedIn);

    // console.log('User is Online?', isUserOnline);

    let club = {
      administrator: 'manu',
      name: 'superClub',
      description: 'finden sonst keine Freunde',
      time: date,
      creationDate: date,
      theme: 'whatever',
      member: ['linus', 'manuel']
    };

    this.queryService.addClubs(club);
  }
}
