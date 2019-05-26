import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import {
  NgAddToCalendarService,
  ICalendarEvent
} from '@trademe/ng-add-to-calendar';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss']
})
export class DetailedViewComponent implements OnInit {
  public googleCalendarEventUrl: SafeUrl;
  public newEvent: ICalendarEvent;

  constructor(
    private route: ActivatedRoute,
    private _addToCalendarService: NgAddToCalendarService,
    private _sanitizer: DomSanitizer,
    private clubService: ClubService,
    private authService: AuthService
  ) {
    this.newEvent = {
      // Event title
      title: 'My event title',
      // Event start date
      start: new Date('June 15, 2013 19:00'),
      // Event duration (IN MINUTES)
      duration: 120,
      // If an end time is set, this will take precedence over duration (optional)
      end: new Date('June 15, 2013 23:00'),
      // Event Address (optional)
      address: '1 test street, testland',
      // Event Description (optional)
      description: 'An awesome event'
    };
  }

  club = {};
  id;
  isMember = false;

  render = function() {
    return this.isMember
      ? `<div id="joinClubButton">
        <button mat-stroked-button color="primary" class="submit">
          Club beitreten
        </button>
      </div>`
      : `<div class="chat">Chat</div>`;
  };

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

    // google cal
    this.googleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
      this._addToCalendarService.getHrefFor(
        this._addToCalendarService.calendarType.google,
        this.newEvent
      )
    );
  }
}
