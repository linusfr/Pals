import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/queries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private queryService: QueryService) {}

  ngOnInit() {
    this.queryService.testQuery();
    this.queryService.getClubs();

    let date = new Date();

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
