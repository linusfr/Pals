// -----------------------------------------------------------------------------
//
// ------------------------------------------------------------------------------


import { Component, OnInit } from '@angular/core';
import {
  NgAddToCalendarService,
  ICalendarEvent
} from '@trademe/ng-add-to-calendar';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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
    private userService: UserService,
    private chatAuth: CometChatApiService
  ) { }

  club = {};
  currentUsr = {};
  id;
  isMember = false;
  isOwner = false;
  meinDatum;
  myDate;

  // 
  render = function () {
    return this.isMember
      ? `<div id="joinClubButton">
        <button mat-stroked-button color="primary" class="submit">
          Club beitreten
        </button>
      </div>`
      : `<div class="chat">Chat</div>`;
  };

  // 
  ngOnInit() {
    this.club = this.route.params.subscribe(params => {
      this.id = params['id'];
      localStorage.clubID = this.id;
      let b = localStorage.getItem('clubID');

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

          // Konvertierung des vom Nutzer übergebenen Treffpunkt-Datums
          // in die nötigen Formate für Google Calendar und die Club-Anzeige
          this.meinDatum = this.formatMeetingDate(club[0].time);
          this.myDate = this.formatDateforCalendar(club[0].time);

          // Aus den vom Nutzer festgelegten Daten zum Club wird ein Event erstellt, 
          // das vom addToCalendarService an den Google Calendar übergeben wird.
          this.newEvent = {
            // Eventtitel
            title: club[0].name,
            // Event Startzeit - diese muss im folgenden Format vom Nutzer übergeben werden, 
            // damit Google Calendar das Datum auslesen kann: 2011-04-11T10:20
            start: new Date(this.myDate),  
            // Eventdauer in Minuten (standardmäßig auf 120 Minuten festgelegt)
            duration: 120,
            // Treffpunkt
            address: club[0].place ? club[0].place : 'place',
            // Clubbeschreibung 
            description: club[0].description
          };
          this.googleCalendarEventUrl = this._sanitizer.bypassSecurityTrustUrl(
            this._addToCalendarService.getHrefFor(
              this._addToCalendarService.calendarType.google,
              this.newEvent
            )
          );
        });

      this.clubService
        .getDetailedClub(this.id, localStorage.activeUser)
        .subscribe(club => {
          this.club = club[0];
        });
    });

    this.userService.getActiveUser().subscribe(user => {
      this.currentUsr = user[0];
    });
  }

  // Funktion um das erhaltene Datum in das richtige Format für ein Date-Objekt zu bringen,
  // damit dies von der Google Calendar API gelesen werden kann.
  // Dabei wird der erhaltene String (nötiges Format: 27-04-2019-12-00) an den Minuszeichen
  // getrennt und einzelne Substrings in die richtige Reihenfolge an ein Date-Objekt übergeben. 
  // Der Monat (part 1) wird von JavaScript von 0 an gezählt, daher -1 rechnen --> 0 = Januar
  formatDateforCalendar = olddate => {
    let parts = olddate.split('-');
    let mydate = new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);
    return mydate;
  }

  // Funktion um das erhaltene Datum als ausgeschriebenes Datum auf Deutsch zurückzuliefern
  formatMeetingDate = olddate => {
    let parts = olddate.split('-');
    let mydate = new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);
    let options = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minutes: 'numeric'
    };
    let meinDatum = mydate.toLocaleDateString('de-DE', options);
    return meinDatum;
  }

//
  exitClub = () => {
    this.clubService
      .removeMember(this.club, localStorage.activeUser)
      .subscribe(data => {
        this.club = data;
        this.isMember = false;
      });
  }

  // Funktion, die aufgerufen wird, wenn ein Nutzer einem Club beitritt.
  // ... add stuff...
  // Zudem wird der Nutzer mit Hilfe des Comet-Chat-API-Services der Chatgruppe
  // in der Comet Chat Datenbank hinzugefügt. 
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
