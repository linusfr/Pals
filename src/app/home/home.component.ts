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
  }
}
