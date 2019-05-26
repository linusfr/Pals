import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-joined-clubs',
  templateUrl: './joined-clubs.component.html',
  styleUrls: ['./joined-clubs.component.scss']
})
export class JoinedClubsComponent implements OnInit {
  constructor(private clubService: ClubService) {}

  clubs;

  ngOnInit() {
    this.clubService.getJoinedClubs().subscribe(clubs => {
      this.clubs = clubs;
    });
  }
}
