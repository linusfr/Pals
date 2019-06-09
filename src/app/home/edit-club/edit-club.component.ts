// -----------------------------------------------------------------------------
// Diese Komponente dient der Bearbeitung von Clubs.
// Es werden die vom User eingegebenen Parameter überprüft
// und validiert und anschließend an den Service weitergeleitet.
// ------------------------------------------------------------------------------

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

  // Es werden die Kategorien aus dem categoryService geholt.
  // Als Parameter werden die ID des Clubs mitgegeben, der bearbeitet werden soll.
  // Weiterhin wird geprüft, ob der User, der den Club bearbeiten will, der Administrator ist.
  ngOnInit() {
    this.club = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('club_id', this.id);
      console.log('user_id', localStorage.activeUser);
      // Die Detailansicht des Clubs wird hier aus dem Service geholt,
      // dabei wird die ID des Clubs sowie die ID des Users mit übergeben
      this.clubService
        .getDetailedClub(this.id, localStorage.activeUser)
        .subscribe(club => {
          this.club = club[0];
          console.log(club);
        });
    });
  }

  // userForm ist für die Verarbeitung der User-Eingaben zuständig.
  // Die FormGroup übernimmt den Zustand und die Validierung der im
  // HTML vorhandenen FormControl-Instanzen. Validators.required überprüft,
  // ob der eingebene Name schon verwendet wird.
  userForm = new FormGroup({
    brief: new FormControl(),
    description: new FormControl(),
    time: new FormControl(),
    place: new FormControl()
  });
  // Hier werden die einzelnen Werte der FormGroup ausgelesen.
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

    let changedClub;
    let changedID;

    this.clubService
      .getDetailedClub(this.id, localStorage.activeUser)
      .subscribe(club => {
        changedClub = club[0];
        changedID = club[0]._id;

        // Es wird geprüft, ob die Eingabefelder bearbeitet wurden.
        // Wenn man nur einige Eingabefelder bearbeiten möchte,
        // wird der Rest mit den alten Daten befüllt
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
            this.router.navigate(['detailedClub', changedClub._id]);
          });
      });
  }
}
