import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent implements OnInit {
  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute
  ) {}

  club = {};
  id;

  ngOnInit() {
    this.club = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('club_id', this.id);
      console.log('user_id', localStorage.activeUser);

      this.clubService
        .getDetailedClub(this.id, localStorage.activeUser)
        .subscribe(club => {
          this.club = club[0];
          console.log(club);
        });
    });
  }
  
}
