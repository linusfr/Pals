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
import { UserService } from '../../services/user.service';
import { CometChatApiService } from '../../chat/CometChatService/comet-chat-api.service';

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
    private authService: AuthService,
    private userService: UserService,
    private chatAuth: CometChatApiService
  ) {}

  club = {};
  currentUsr = {};
  id;
  isMember = false;
  isOwner = false;

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
      localStorage.clubID = this.id;
      let b = localStorage.getItem('clubID');
      console.log(`this is the club id: ${b}`, b);

      this.clubService
        .getDetailedClub(this.id, localStorage.activeUser)
        .subscribe(club => {
          this.club = club[0];
          let user = localStorage.activeUser;

          // check member
          club[0].member.forEach(member => {
            if (member === user) {
              this.isMember = true;
            }
          });

          // check owner
          if (club[0].administrator._id === user) {
            this.isOwner = true;
          }

          console.log(club);

          this.newEvent = {
            // Event title
            title: club[0].name,
            // Event start date
            start: new Date('June 15, 2013 19:00'),
            // Event duration (IN MINUTES)
            duration: 120,
            // If an end time is set, this will take precedence over duration (optional)
            // end: new Date('June 15, 2013 23:00'),
            // Event Address (optional)
            address: '1 test street, testland',
            // Event Description (optional)
            description: club[0].description
          };
          this.googleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
            this._addToCalendarService.getHrefFor(
              this._addToCalendarService.calendarType.google,
              this.newEvent
            )
          );

          // console.log('isOwner', this.isOwner);
          // console.log('isMember', this.isMember);
        });

      this.clubService
        .getDetailedClub(this.id, localStorage.activeUser)
        .subscribe(club => {
          this.club = club[0];
        });
    });

    this.userService.getActiveUser().subscribe(user => {
      this.currentUsr = user[0];
      // console.log(this.currentUsr);
    });
  }

  exitClub = () => {
    this.clubService
      .removeMember(this.club, localStorage.activeUser)
      .subscribe(data => {
        this.club = data;
        this.isMember = false;
      });
  }

  joinClub = () => {
    this.clubService
      .addMember(this.club, localStorage.activeUser)
      .subscribe(data => {
        this.club = data;
        this.isMember = true;
        this.chatAuth.addGroupMember(this.id, localStorage.activeUser);
      });
  }
}
