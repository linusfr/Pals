import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClubService } from '../../services/club.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.scss']
})
export class EditClubComponent implements OnInit {
  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
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

  // Form Group
  userForm = new FormGroup({
    brief: new FormControl(),
    description: new FormControl(),
    time: new FormControl(),
    place: new FormControl()
  });

  get brief(): any {
    return this.userForm.get('brief');
  }
  get description(): any {
    return this.userForm.get('description');
  }
  get time(): any {
    return this.userForm.get('time');
  }
  get place(): any {
    return this.userForm.get('place');
  }

  async editClub() {
    let { brief, description, time, place } = this.userForm.getRawValue();
    console.log(brief, description, time, place);

    let changedClub;
    let changedID;

    this.clubService
      .getDetailedClub(this.id, localStorage.activeUser)
      .subscribe(club => {
        changedClub = club[0];
        changedID = club[0]._id;
        console.log('changedClub', changedClub);

        if (brief === null) {
          brief = changedClub.brief;
        }
        if (description === null) {
          description = changedClub.description;
        }
        if (time === null) {
          time = changedClub.time;
        }
        if (place === null) {
          place = changedClub.place;
        }

        this.clubService
          .editClub({
            changedID,
            brief,
            description,
            time,
            place
          })
          .subscribe(data => {
            let returnClub = data;
            console.log(data);
            this.router.navigate(['detailedClub', changedClub._id]);
          });
      });
  }
}
